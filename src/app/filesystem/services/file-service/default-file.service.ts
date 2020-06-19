import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
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

  public createMany(loadDirectoryResults: LoadDirectoryResult[]): Observable<File[]> {
    const files: LoadDirectoryResult[] = loadDirectoryResults.filter(
      (result: LoadDirectoryResult) => !result.isDirectory,
    );
    const size: number = files.length;
    const files$ = this.fileIds$.pipe(
      map((ids: Id[]) => this.idGeneratorService.nextNIds(size, ids)),
      map((nextIds: Id[]) => this.mapTo(nextIds, files)),
      take(1),
    );
    return files$;
  }

  public sortDefault(files: File[]): File[] {
    return this.sortService.sort(files, {
      primarySort: (a, b) => a.name.localeCompare(b.name),
    });
  }

  public setAll(files: File[]): void {
    this.store.dispatch(fileActions.setAll({ entities: files }));
  }

  public upsertMany(files: File[]): void {
    this.store.dispatch(fileActions.upsertMany({ entities: files }));
  }

  public isLoaded(file: File): Observable<boolean> {
    return this.store.pipe(select(fileSelectors.selectIsLoadedId, { id: file.id }), take(1));
  }

  public updateLoaded(file: File, content: string): void {
    this.store.dispatch(
      fileActions.updateOne({
        update: {
          id: file.id as number,
          changes: {
            content,
          },
        },
      }),
    );
    this.store.dispatch(fileActions.insertLoadedId({ id: file.id }));
  }

  private mapTo(ids: Id[], loadDirectoryResults: LoadDirectoryResult[]): File[] {
    const files: File[] = ids.map((id: Id, index: number) => {
      const { isDirectory, ...toFile } = loadDirectoryResults[index];
      const file: File = {
        id,
        content: null,
        ...toFile,
      };
      return file;
    });
    return files;
  }
}
