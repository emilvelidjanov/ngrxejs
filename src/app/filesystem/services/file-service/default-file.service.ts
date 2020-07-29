import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

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
  ) {
    this.fileIds$ = this.store.pipe(select(fileSelectors.selectIds));
  }

  public createMany(loadDirectoryResults: LoadDirectoryResult[]): Observable<File[]> {
    const fileResults = loadDirectoryResults.filter((result) => !result.isDirectory);
    const size = fileResults.length;
    const files$ = this.fileIds$.pipe(
      map((ids) => this.idGeneratorService.nextNIds(size, ids)),
      map((ids) =>
        ids.map((id, index) => {
          const fileResult = fileResults[index];
          const file: File = {
            id,
            content: null,
            isLoaded: false,
            extension: fileResult.extension,
            name: fileResult.name,
            path: fileResult.path,
          };
          return file;
        }),
      ),
      take(1),
    );
    return files$;
  }

  public setAll(files: File[]): void {
    this.store.dispatch(fileActions.setAll({ entities: files }));
  }

  public addMany(files: File[]): void {
    if (files && files.length) {
      this.store.dispatch(fileActions.addMany({ entities: files }));
    }
  }

  public updateLoaded(file: File, content: string): void {
    this.store.dispatch(
      fileActions.updateOne({
        update: {
          id: file.id,
          changes: {
            content,
            isLoaded: true,
          },
        },
      }),
    );
  }
}
