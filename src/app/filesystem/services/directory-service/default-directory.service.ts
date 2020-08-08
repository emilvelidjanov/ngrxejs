import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { directoryActions } from '../../store/directory/directory.actions';
import { directorySelectors } from '../../store/directory/directory.selectors';
import { Directories, Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';
import { LoadDirectoryResult, StatResult } from '../filesystem-service/filesystem.service';

import { DirectoryService } from './directory.service';

@Injectable()
export class DefaultDirectoryService implements DirectoryService {
  private directoryIds$: Observable<Id[]>;

  constructor(
    private store: Store<Directories>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
  ) {
    this.directoryIds$ = this.store.pipe(select(directorySelectors.selectIds));
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

  public createOne(stat: StatResult): Observable<Directory> {
    const directory$ = this.directoryIds$.pipe(
      map((ids) => this.idGeneratorService.nextId(ids)),
      map((id) => {
        // TODO: use default factory method
        const directory: Directory = {
          id,
          fileIds: [],
          directoryIds: [],
          isLoaded: false,
          name: stat.name,
          path: stat.path,
        };
        return directory;
      }),
      take(1),
    );
    return directory$;
  }

  public createMany(loadDirectoryResults: LoadDirectoryResult[]): Observable<Directory[]> {
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
}
