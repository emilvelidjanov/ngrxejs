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
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';

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
  public addMany(directories: Directory[]): void {
    this.store.dispatch(directoryActions.addMany({ entities: directories }));
  }

  public select(id: Id): Observable<Directory> {
    return this.store.pipe(select(directorySelectors.selectEntityById, { id }));
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
            fileIds: null,
            directoryIds: null,
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

  public setAll(directories: Directory[]): void {
    this.store.dispatch(directoryActions.setAll({ entities: directories }));
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
}
