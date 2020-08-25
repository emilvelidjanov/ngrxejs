import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { SortService } from 'src/app/core/services/sort-service/sort.service';
import { sortServiceDep } from 'src/app/core/services/sort-service/sort.service.dependency';

import { fileActions } from '../../store/file/file.actions';
import { fileSelectors } from '../../store/file/file.selectors';
import { File, Files } from '../../store/file/file.state';
import { StatResult } from '../filesystem-service/filesystem.service';

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

  public addOne(file: File): void {
    if (file) {
      this.store.dispatch(fileActions.addOne({ entity: file }));
    }
  }

  public selectByIds(ids: Id[]): Observable<File[]> {
    return this.store.pipe(select(fileSelectors.selectEntitiesByIds, { ids }));
  }

  public selectByPaths(paths: string[]): Observable<File[]> {
    return this.store.pipe(select(fileSelectors.selectEntitiesByPredicate, { predicate: (file) => paths.includes(file.path) }));
  }

  public select(id: Id): Observable<File> {
    return this.store.pipe(select(fileSelectors.selectEntityById, { id }));
  }

  public createOne(partial: IdLessPartial<File>): Observable<File> {
    const file$ = this.fileIds$.pipe(
      map((ids) => this.idGeneratorService.nextId(ids)),
      map((id) => {
        // TODO: use default factory method
        const file: File = {
          id,
          path: null,
          name: null,
          extension: null,
          content: null,
          isLoaded: false,
          ...partial,
        };
        return file;
      }),
      take(1),
    );
    return file$;
  }

  public createMany(loadDirectoryResults: StatResult[]): Observable<File[]> {
    const fileResults = loadDirectoryResults.filter((result) => !result.isDirectory);
    const size = fileResults.length;
    const files$ = this.fileIds$.pipe(
      map((ids) => this.idGeneratorService.nextNIds(size, ids)),
      map((ids) =>
        ids.map((id, index) => {
          const fileResult = fileResults[index];
          const file: File = {
            id,
            path: fileResult.path,
            name: fileResult.name,
            extension: fileResult.extension,
            content: null,
            isLoaded: false,
          };
          return file;
        }),
      ),
      take(1),
    );
    return files$;
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

  public sort(files: File[]): File[] {
    return this.sortService.sort<File>(files, {
      primarySort: (a, b) => a.name.localeCompare(b.name),
    });
  }
}
