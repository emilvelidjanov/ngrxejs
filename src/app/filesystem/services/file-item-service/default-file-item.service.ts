import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityPartial, Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { SortService } from 'src/app/core/services/sort-service/sort.service';
import { sortServiceDep } from 'src/app/core/services/sort-service/sort.service.dependency';

import { fileItemActions } from '../../store/file-item/file-item.actions';
import { fileItemSelectors } from '../../store/file-item/file-item.selectors';
import { FileItem, FileItems } from '../../store/file-item/file-item.state';
import { File } from '../../store/file/file.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

import { FileItemService } from './file-item.service';

@Injectable()
export class DefaultFileItemService implements FileItemService {
  private fileItemIds$: Observable<Id[]>;

  constructor(
    private store: Store<FileItems>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
    @Inject(sortServiceDep.getToken()) private sortService: SortService,
  ) {
    this.fileItemIds$ = this.store.pipe(select(fileItemSelectors.selectIds));
  }

  public createOneFromEntities(file: File, projectTree: ProjectTree): Observable<FileItem> {
    const partial: IdLessPartial<FileItem> = {
      fileId: file.id,
      projectTreeId: projectTree.id,
    };
    return this.createOne(partial);
  }

  public createManyFromEntities(files: File[], projectTree: ProjectTree): Observable<FileItem[]> {
    const partials = files.map((file) => {
      const partial: IdLessPartial<FileItem> = {
        fileId: file.id,
        projectTreeId: projectTree.id,
      };
      return partial;
    });
    return this.createMany(partials);
  }

  public createDefault(partial: EntityPartial<FileItem>): FileItem {
    const fileItem: FileItem = {
      fileId: null,
      projectTreeId: null,
      ...partial,
    };
    return fileItem;
  }

  public createOne(partial: IdLessPartial<FileItem>): Observable<FileItem> {
    const fileItem$ = this.fileItemIds$.pipe(
      map((ids) => this.idGeneratorService.nextId(ids)),
      map((id) => this.createDefault({ id, ...partial })),
    );
    return fileItem$;
  }

  public createMany(partials: IdLessPartial<FileItem>[]): Observable<FileItem[]> {
    const fileItems$ = this.fileItemIds$.pipe(
      map((ids) => this.idGeneratorService.nextNIds(partials.length, ids)),
      map((ids) => ids.map((id, index) => this.createDefault({ id, ...partials[index] }))),
    );
    return fileItems$;
  }

  public addOne(entity: FileItem): void {
    if (entity) {
      this.store.dispatch(fileItemActions.addOne({ entity }));
    }
  }

  public addMany(entities: FileItem[]): void {
    if (entities && entities.length) {
      this.store.dispatch(fileItemActions.addMany({ entities }));
    }
  }

  public selectOne(id: Id): Observable<FileItem> {
    return this.store.pipe(select(fileItemSelectors.selectEntityById, { id }));
  }

  public selectMany(ids: Id[]): Observable<FileItem[]> {
    return this.store.pipe(select(fileItemSelectors.selectEntitiesByIds, { ids }));
  }

  public selectByFiles(files: File[]): Observable<FileItem[]> {
    const fileIds = files.map((file) => file.id);
    return this.store.pipe(select(fileItemSelectors.selectEntitiesByPredicate, { predicate: (entity) => fileIds.includes(entity.fileId) }));
  }

  public applySortByFiles(fileItems: FileItem[], files: File[]): FileItem[] {
    if (fileItems.length === files.length) {
      const ids = files.map((file) => file.id);
      return this.sortService.sort(fileItems, {
        primarySort: (a, b) => ids.indexOf(a.fileId) - ids.indexOf(b.fileId),
      });
    }
    return fileItems;
  }
}
