import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, zip } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { SortService } from 'src/app/core/services/sort-service/sort.service';
import { sortServiceDep } from 'src/app/core/services/sort-service/sort.service.dependency';

import { directoryActions } from '../../store/directory/directory.actions';
import { directorySelectors } from '../../store/directory/directory.selectors';
import { Directories, Directory } from '../../store/directory/directory.state';
import { File } from '../../store/file/file.state';
import { FileService } from '../file-service/file.service';
import { fileServiceDep } from '../file-service/file.service.dependency';
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';

import { DirectoryContent, DirectoryService } from './directory.service';

@Injectable()
export class DefaultDirectoryService implements DirectoryService {
  private directoryIds$: Observable<Id[]>;

  constructor(
    private store: Store<Directories>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
    @Inject(sortServiceDep.getToken()) private sortService: SortService,
    @Inject(fileServiceDep.getToken()) private fileService: FileService,
  ) {
    this.directoryIds$ = this.store.pipe(select(directorySelectors.selectIds));
  }

  public createDirectoryContent(loadDirectoryResults: LoadDirectoryResult[]): Observable<DirectoryContent> {
    const createFiles$ = this.fileService.createMany(loadDirectoryResults);
    const createDirectories$ = this.createMany(loadDirectoryResults);
    return zip(createFiles$, createDirectories$).pipe(map(([files, directories]) => ({ files, directories })));
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

  public sortDefault(directories: Directory[]): Directory[] {
    return this.sortService.sort(directories, {
      primarySort: (a, b) => a.name.localeCompare(b.name),
    });
  }

  public setAll(directories: Directory[]): void {
    this.store.dispatch(directoryActions.setAll({ entities: directories }));
  }

  public updateLoaded(loadedDirectory: Directory, content: DirectoryContent): void {
    this.fileService.upsertMany(content.files);
    this.store.dispatch(directoryActions.addMany({ entities: content.directories }));
    this.store.dispatch(
      directoryActions.updateOne({
        update: {
          id: loadedDirectory.id as number,
          changes: {
            fileIds: this.fileService.sortDefault(content.files).map((file: File) => file.id),
            directoryIds: this.sortDefault(content.directories).map((directory: Directory) => directory.id),
          },
        },
      }),
    );
    this.store.dispatch(directoryActions.insertLoadedId({ id: loadedDirectory.id }));
  }

  public toggleOpened(directory: Directory): void {
    this.store.dispatch(directoryActions.toggleOpenedId({ id: directory.id }));
  }

  public isLoaded(directory: Directory): Observable<boolean> {
    return this.store.pipe(select(directorySelectors.selectIsLoadedId, { id: directory.id }), take(1));
  }

  private mapTo(ids: Id[], loadDirectoryResults: LoadDirectoryResult[]): Directory[] {
    const directories: Directory[] = ids.map((id: Id, index: number) => {
      const { isDirectory, ...toDirectory } = loadDirectoryResults[index];
      const directory: Directory = {
        id,
        fileIds: null,
        directoryIds: null,
        ...toDirectory,
      };
      return directory;
    });
    return directories;
  }
}
