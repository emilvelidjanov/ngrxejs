import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityPartial, Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
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

  public createDefault(partial: EntityPartial<File>): File {
    const file: File = {
      path: null,
      name: null,
      extension: null,
      content: null,
      isLoaded: false,
      ...partial,
    };
    return file;
  }

  public addOne(entity: File): void {
    if (entity) {
      this.store.dispatch(fileActions.addOne({ entity }));
    }
  }

  public selectMany(ids: Id[]): Observable<File[]> {
    return this.store.pipe(select(fileSelectors.selectEntitiesByIds, { ids }));
  }

  public selectByPaths(paths: string[]): Observable<File[]> {
    return this.store.pipe(select(fileSelectors.selectEntitiesByPredicate, { predicate: (file) => paths.includes(file.path) }));
  }

  public selectOne(id: Id): Observable<File> {
    return this.store.pipe(select(fileSelectors.selectEntityById, { id }));
  }

  public createOne(partial: IdLessPartial<File>): Observable<File> {
    const file$ = this.fileIds$.pipe(
      map((ids) => this.idGeneratorService.nextId(ids)),
      map((id) => this.createDefault({ id, ...partial })),
    );
    return file$;
  }

  public createMany(partials: IdLessPartial<File>[]): Observable<File[]> {
    const files$ = this.fileIds$.pipe(
      map((ids) => this.idGeneratorService.nextNIds(partials.length, ids)),
      map((ids) => ids.map((id, index) => this.createDefault({ id, ...partials[index] }))),
    );
    return files$;
  }

  public createManyFromStatResults(statResults: StatResult[]): Observable<File[]> {
    return this.createMany(
      statResults.map((result) => {
        const partial: IdLessPartial<File> = {
          path: result.path,
          name: result.name,
          extension: result.extension,
        };
        return partial;
      }),
    );
  }

  public addMany(entities: File[]): void {
    if (entities && entities.length) {
      this.store.dispatch(fileActions.addMany({ entities }));
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
