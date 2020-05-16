import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { SortService } from 'src/app/core/services/sort-service/sort.service';
import { sortServiceDep } from 'src/app/core/services/sort-service/sort.service.dependency';

import { fileActions } from '../../store/file/file.actions';
import { fileSelectors } from '../../store/file/file.selectors';
import { File, Files } from '../../store/file/file.state';
import { LoadDirectoryResult } from '../filesystem-service/filesystem.service';

import { FileService } from './file.service';

@Injectable()
export class DefaultFileService implements FileService {
  private fileIds$: Observable<Id[]>;

  constructor(
    private store: Store<Files>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
    @Inject(sortServiceDep.getToken()) private sortService: SortService,
  ) {
    this.fileIds$ = this.store.pipe(select(fileSelectors.selectIds));
  }

  public createFiles(loadDirectoryResults: LoadDirectoryResult[]): Observable<File[]> {
    const size: number = loadDirectoryResults.length;
    const files$ = this.fileIds$.pipe(
      map((ids: Id[]) => this.idGeneratorService.nextNIds(size, ids)),
      map((nextIds: Id[]) => this.mapToFiles(nextIds, loadDirectoryResults)),
      take(1),
    );
    return files$;
  }

  public sortFilesDefault(file: File[]): File[] {
    return this.sortService.sort(file, {
      primarySort: (a, b) => {
        if (a.isDirectory === b.isDirectory) {
          return 0;
        }
        if (a.isDirectory) {
          return -1;
        }
        if (b.isDirectory) {
          return 1;
        }
      },
      secondarySort: (a, b) => a.name.localeCompare(b.name),
    });
  }

  public dispatchSetAll(files: File[]): void {
    this.store.dispatch(fileActions.setAll({ entities: files }));
  }

  public dispatchLoadedDirectory(directory: File, files: File[]): void {
    this.store.dispatch(fileActions.addMany({ entities: files }));
    this.store.dispatch(
      fileActions.updateOne({
        update: {
          id: directory.id as number,
          changes: {
            fileIds: this.sortFilesDefault(files).map((file: File) => file.id),
          },
        },
      }),
    );
    this.store.dispatch(fileActions.addLoadedDirectoryId({ id: directory.id }));
  }

  public dispatchOpenedDirectory(directory: File): void {
    this.store.dispatch(fileActions.toggleOpenedDirectoryId({ id: directory.id }));
  }

  public selectIsLoadedDirectory(directory: File): Observable<boolean> {
    return this.store.pipe(select(fileSelectors.selectIsLoadedDirectoryId, { id: directory.id }));
  }

  private mapToFiles(ids: Id[], loadDirectoryResults: LoadDirectoryResult[]): File[] {
    const files: File[] = ids.map((id: Id, index: number) => {
      const file: File = {
        id,
        fileIds: [],
        ...loadDirectoryResults[index],
      };
      return file;
    });
    return files;
  }
}
