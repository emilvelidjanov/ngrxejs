import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { filter, map, share, switchMap, take } from 'rxjs/operators';
import { EntityPartial, Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { SortService } from 'src/app/core/services/sort-service/sort.service';
import { sortServiceDep } from 'src/app/core/services/sort-service/sort.service.dependency';

import { DirectoryItem } from '../../store/directory-item/directory-item.state';
import { directoryActions } from '../../store/directory/directory.actions';
import { directorySelectors } from '../../store/directory/directory.selectors';
import { Directories, Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';
import { Project } from '../../store/project/project.state';
import { StatResult } from '../filesystem-service/filesystem.service';

import { DirectoryService } from './directory.service';

@Injectable()
export class DefaultDirectoryService implements DirectoryService {
  private directoryIds$: Observable<Id[]>;

  constructor(
    private store: Store<Directories>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
    @Inject(sortServiceDep.getToken()) private sortService: SortService,
  ) {
    this.directoryIds$ = this.store.pipe(select(directorySelectors.selectIds));
  }

  public removeDirectory(directory: Directory, parentDirectory: Directory): void {
    if (directory && parentDirectory && parentDirectory.directoryIds.includes(directory.id)) {
      this.store.dispatch(
        directoryActions.updateOne({
          update: {
            id: parentDirectory.id,
            changes: {
              directoryIds: parentDirectory.directoryIds.filter((id) => id !== directory.id),
            },
          },
        }),
      );
    }
  }

  public selectOneByContainsDirectory(directory: Directory): Observable<Directory> {
    return this.store.pipe(
      select(directorySelectors.selectEntitiesByPredicate, { predicate: (entity) => entity.directoryIds.includes(directory.id) }),
      map((directories) => (directories.length ? directories[0] : null)),
    );
  }

  public selectAll(): Observable<Directory[]> {
    return this.store.pipe(select(directorySelectors.selectAll));
  }

  public removeFile(file: File, directory: Directory): void {
    if (file && directory && directory.fileIds.includes(file.id)) {
      this.store.dispatch(
        directoryActions.updateOne({
          update: {
            id: directory.id,
            changes: {
              fileIds: directory.fileIds.filter((id) => id !== file.id),
            },
          },
        }),
      );
    }
  }

  public selectOneByContainsFile(file: File): Observable<Directory> {
    return this.store.pipe(
      select(directorySelectors.selectEntitiesByPredicate, {
        predicate: (directory) => directory.fileIds.includes(file.id),
      }),
      map((directories) => (directories.length ? directories[0] : null)),
    );
  }

  public removeOne(entity: Directory): void {
    if (entity) {
      this.store.dispatch(directoryActions.removeOne({ id: entity.id }));
    }
  }

  public removeMany(entities: Directory[]): void {
    if (entities && entities.length) {
      const ids = entities.map((entity) => entity.id);
      this.store.dispatch(directoryActions.removeMany({ ids }));
    }
  }

  public selectManyByParentDirectory(directory: Directory): Observable<Directory[]> {
    return this.selectMany(directory.directoryIds);
  }

  public selectOrCreateManyFromStatResults(statResults: StatResult[]): Observable<Directory[]> {
    const dirResults = statResults.filter((result) => result.isDirectory);
    const paths = dirResults.map((result) => result.path);
    const selectExisting$ = this.selectByPaths(paths).pipe(take(1), share());
    const existingPaths$ = selectExisting$.pipe(map((dirs) => dirs.map((dir) => dir.path)));
    const remainingResults$ = existingPaths$.pipe(map((existingPaths) => dirResults.filter((result) => !existingPaths.includes(result.path))));
    const createDirs$ = remainingResults$.pipe(
      switchMap((results) => this.createManyFromStatResults(results)),
      take(1),
    );
    const combine$ = forkJoin([selectExisting$, createDirs$]).pipe(map(([existing, created]) => [...existing, ...created]));
    return combine$;
  }

  public selectOneByDirectoryItem(directoryItem: DirectoryItem): Observable<Directory> {
    return this.selectOne(directoryItem.directoryId);
  }

  public selectRootOfProject(project: Project): Observable<Directory> {
    return this.selectOne(project.rootDirectoryId);
  }

  public createOneFromStatResult(statResult: StatResult): Observable<Directory> {
    return this.createOne({ name: statResult.name, path: statResult.path });
  }

  public createDefault(partial: EntityPartial<Directory>): Directory {
    const directory: Directory = {
      id: null,
      path: null,
      name: null,
      fileIds: [],
      directoryIds: [],
      isLoaded: false,
      ...partial,
    };
    return directory;
  }

  public createMany(partials: IdLessPartial<Directory>[]): Observable<Directory[]> {
    const directories$ = this.directoryIds$.pipe(
      map((ids) => this.idGeneratorService.nextNIds(partials.length, ids)),
      map((ids) => ids.map((id, index) => this.createDefault({ id, ...partials[index] }))),
    );
    return directories$;
  }

  public selectMany(ids: Id[]): Observable<Directory[]> {
    return this.store.pipe(select(directorySelectors.selectEntitiesByIds, { ids }));
  }

  public selectByPaths(paths: string[]): Observable<Directory[]> {
    return this.store.pipe(
      select(directorySelectors.selectEntitiesByPredicate, {
        predicate: (directory) => paths.includes(directory.path),
      }),
    );
  }

  public addOne(entity: Directory): void {
    if (entity) {
      this.store.dispatch(directoryActions.addOne({ entity }));
    }
  }

  public addMany(entities: Directory[]): void {
    if (entities && entities.length) {
      this.store.dispatch(directoryActions.addMany({ entities }));
    }
  }

  public selectOne(id: Id): Observable<Directory> {
    return this.store.pipe(select(directorySelectors.selectEntityById, { id }));
  }

  public createOne(partial: IdLessPartial<Directory>): Observable<Directory> {
    const directory$ = this.directoryIds$.pipe(
      map((ids) => this.idGeneratorService.nextId(ids)),
      map((id) => this.createDefault({ id, ...partial })),
      take(1),
    );
    return directory$;
  }

  public createManyFromStatResults(statResults: StatResult[]): Observable<Directory[]> {
    const directoryResults = statResults.filter((result) => result.isDirectory);
    return this.createMany(
      directoryResults.map((result) => {
        const partial: IdLessPartial<Directory> = {
          path: result.path,
          name: result.name,
        };
        return partial;
      }),
    );
  }

  public updateLoaded(loadedDirectory: Directory, files: File[], directories: Directory[]): void {
    this.store.dispatch(
      directoryActions.updateOne({
        update: {
          id: loadedDirectory.id,
          changes: {
            fileIds: files.map((file) => file.id),
            directoryIds: directories.map((directory) => directory.id),
            isLoaded: true,
          },
        },
      }),
    );
  }

  public selectByPath(path: string): Observable<Directory> {
    return this.store.pipe(
      select(directorySelectors.selectEntitiesByPredicate, { predicate: (entity) => entity.path === path }),
      map((entities) => (entities.length ? entities[0] : null)),
    );
  }

  public sort(directories: Directory[]): Directory[] {
    return this.sortService.sort<Directory>(directories, {
      primarySort: (a, b) => a.name.localeCompare(b.name),
    });
  }

  public updateDirectories(directories: Directory[], directory: Directory): void {
    if (directories && directory) {
      this.store.dispatch(
        directoryActions.updateOne({
          update: {
            id: directory.id,
            changes: {
              directoryIds: directories.map((directory) => directory.id),
            },
          },
        }),
      );
    }
  }

  public updateFiles(files: File[], directory: Directory): void {
    if (files && directory) {
      this.store.dispatch(
        directoryActions.updateOne({
          update: {
            id: directory.id,
            changes: {
              fileIds: files.map((file) => file.id),
            },
          },
        }),
      );
    }
  }
}
