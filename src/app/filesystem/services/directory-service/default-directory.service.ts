import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { SortService } from 'src/app/core/services/sort-service/sort.service';
import { sortServiceDep } from 'src/app/core/services/sort-service/sort.service.dependency';

import { directoryActions } from '../../store/directory/directory.actions';
import { directorySelectors } from '../../store/directory/directory.selectors';
import { Directories, Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';
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

  public selectById(id: Id): Observable<Directory> {
    return this.store.pipe(select(directorySelectors.selectEntityById, { id }));
  }

  public selectByIds(ids: Id[]): Observable<Directory[]> {
    return this.store.pipe(select(directorySelectors.selectEntitiesByIds, { ids }));
  }

  public selectByPaths(paths: string[]): Observable<Directory[]> {
    return this.store.pipe(
      select(directorySelectors.selectEntitiesByPredicate, {
        predicate: (directory) => paths.includes(directory.path),
      }),
    );
  }

  public addOne(directory: Directory): void {
    if (directory) {
      this.store.dispatch(directoryActions.addOne({ entity: directory }));
    }
  }

  public addMany(directories: Directory[]): void {
    if (directories && directories.length) {
      this.store.dispatch(directoryActions.addMany({ entities: directories }));
    }
  }

  public select(id: Id): Observable<Directory> {
    return this.store.pipe(select(directorySelectors.selectEntityById, { id }));
  }

  public createOne(partial: IdLessPartial<Directory>): Observable<Directory> {
    const directory$ = this.directoryIds$.pipe(
      map((ids) => this.idGeneratorService.nextId(ids)),
      map((id) => {
        // TODO: use default factory method
        const directory: Directory = {
          id,
          fileIds: [],
          directoryIds: [],
          isLoaded: false,
          name: null,
          path: null,
          ...partial,
        };
        return directory;
      }),
      take(1),
    );
    return directory$;
  }

  public createMany(loadDirectoryResults: StatResult[]): Observable<Directory[]> {
    const directoryResults = loadDirectoryResults.filter((result) => result.isDirectory);
    const size = directoryResults.length;
    const directories$ = this.directoryIds$.pipe(
      map((ids) => this.idGeneratorService.nextNIds(size, ids)),
      map((ids) =>
        ids.map((id, index) => {
          const directoryResult = directoryResults[index];
          const directory: Directory = {
            id,
            fileIds: [],
            directoryIds: [],
            isLoaded: false,
            name: directoryResult.name,
            path: directoryResult.path,
          };
          return directory;
        }),
      ),
      take(1),
    );
    return directories$;
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
              directoryIds: files.map((file) => file.id),
            },
          },
        }),
      );
    }
  }
}
