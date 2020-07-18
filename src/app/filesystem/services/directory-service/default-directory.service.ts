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
    const directories = loadDirectoryResults.filter((result: LoadDirectoryResult) => result.isDirectory);
    const size: number = directories.length;
    const directories$ = this.directoryIds$.pipe(
      map((ids: Id[]) => this.idGeneratorService.nextNIds(size, ids)),
      map((nextIds: Id[]) => this.mapTo(nextIds, directories)),
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
          id: loadedDirectory.id as number,
          changes: {
            fileIds: files.map((file: File) => file.id),
            directoryIds: directories.map((directory: Directory) => directory.id),
            isLoaded: true,
          },
        },
      }),
    );
  }

  private mapTo(ids: Id[], loadDirectoryResults: LoadDirectoryResult[]): Directory[] {
    const directories: Directory[] = ids.map((id: Id, index: number) => {
      const { isDirectory, ...toDirectory } = loadDirectoryResults[index];
      const directory: Directory = {
        id,
        fileIds: null,
        directoryIds: null,
        isLoaded: false,
        ...toDirectory,
      };
      return directory;
    });
    return directories;
  }
}
