import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityPartial, Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { SortService } from 'src/app/core/services/sort-service/sort.service';
import { sortServiceDep } from 'src/app/core/services/sort-service/sort.service.dependency';

import { directoryItemActions } from '../../store/directory-item/directory-item.actions';
import { directoryItemSelectors } from '../../store/directory-item/directory-item.selectors';
import { CreateNewInputType, DirectoryItem, DirectoryItems } from '../../store/directory-item/directory-item.state';
import { Directory } from '../../store/directory/directory.state';
import { FileItem } from '../../store/file-item/file-item.state';
import { ProjectTree } from '../../store/project-tree/project-tree.state';

import { DirectoryItemService } from './directory-item.service';

@Injectable()
export class DefaultDirectoryItemService implements DirectoryItemService {
  private directoryItemIds$: Observable<Id[]>;

  constructor(
    private store: Store<DirectoryItems>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
    @Inject(sortServiceDep.getToken()) private sortService: SortService,
  ) {
    this.directoryItemIds$ = this.store.pipe(select(directoryItemSelectors.selectIds));
  }

  public createOneFromEntities(directory: Directory, projectTree: ProjectTree): Observable<DirectoryItem> {
    const partial: IdLessPartial<DirectoryItem> = {
      directoryId: directory.id,
      projectTreeId: projectTree.id,
    };
    return this.createOne(partial);
  }

  public createManyFromEntities(directories: Directory[], projectTree: ProjectTree): Observable<DirectoryItem[]> {
    const partials = directories.map((directory) => {
      const partial: IdLessPartial<DirectoryItem> = {
        directoryId: directory.id,
        projectTreeId: projectTree.id,
      };
      return partial;
    });
    return this.createMany(partials);
  }

  public createDefault(partial: EntityPartial<DirectoryItem>): DirectoryItem {
    const directoryItem: DirectoryItem = {
      directoryId: null,
      directoryItemIds: [],
      fileItemIds: [],
      projectTreeId: null,
      isOpened: false,
      createNewInputType: 'none',
      ...partial,
    };
    return directoryItem;
  }

  public createOne(partial: IdLessPartial<DirectoryItem>): Observable<DirectoryItem> {
    const directoryItem$ = this.directoryItemIds$.pipe(
      map((ids) => this.idGeneratorService.nextId(ids)),
      map((id) => this.createDefault({ id, ...partial })),
    );
    return directoryItem$;
  }

  public createMany(partials: IdLessPartial<DirectoryItem>[]): Observable<DirectoryItem[]> {
    const directoryItems$ = this.directoryItemIds$.pipe(
      map((ids) => this.idGeneratorService.nextNIds(partials.length, ids)),
      map((ids) => ids.map((id, index) => this.createDefault({ id, ...partials[index] }))),
    );
    return directoryItems$;
  }

  public addOne(entity: DirectoryItem): void {
    if (entity) {
      this.store.dispatch(directoryItemActions.addOne({ entity }));
    }
  }

  public addMany(entities: DirectoryItem[]): void {
    if (entities && entities.length) {
      this.store.dispatch(directoryItemActions.addMany({ entities }));
    }
  }

  public selectOne(id: Id): Observable<DirectoryItem> {
    return this.store.pipe(select(directoryItemSelectors.selectEntityById, { id }));
  }

  public selectMany(ids: Id[]): Observable<DirectoryItem[]> {
    return this.store.pipe(select(directoryItemSelectors.selectEntitiesByIds, { ids }));
  }

  public selectByDirectory(directory: Directory): Observable<DirectoryItem> {
    const directoryItem$ = this.store.pipe(
      select(directoryItemSelectors.selectEntitiesByPredicate, {
        predicate: (entity) => entity.directoryId === directory.id,
      }),
      map((directoryItems) => directoryItems[0]),
    );
    return directoryItem$;
  }

  public toggleOpened(directoryItem: DirectoryItem): void {
    this.store.dispatch(
      directoryItemActions.updateOne({
        update: {
          id: directoryItem.id,
          changes: {
            isOpened: !directoryItem.isOpened,
          },
        },
      }),
    );
  }

  public updateLoaded(directoryItem: DirectoryItem, fileItems: FileItem[], directoryItems: DirectoryItem[]): void {
    this.store.dispatch(
      directoryItemActions.updateOne({
        update: {
          id: directoryItem.id,
          changes: {
            fileItemIds: fileItems.map((item) => item.id),
            directoryItemIds: directoryItems.map((item) => item.id),
          },
        },
      }),
    );
  }

  public selectByDirectories(directories: Directory[]): Observable<DirectoryItem[]> {
    const directoryIds = directories.map((directory) => directory.id);
    return this.store.pipe(
      select(directoryItemSelectors.selectEntitiesByPredicate, {
        predicate: (entity) => directoryIds.includes(entity.directoryId),
      }),
    );
  }

  public showCreateNewInput(directoryItem: DirectoryItem, createNewInputType: CreateNewInputType): void {
    if (directoryItem && directoryItem.createNewInputType !== createNewInputType) {
      this.store.dispatch(
        directoryItemActions.updateOne({
          update: {
            id: directoryItem.id,
            changes: {
              createNewInputType,
            },
          },
        }),
      );
    }
  }

  public applySortByDirectories(directoryItems: DirectoryItem[], directories: Directory[]): DirectoryItem[] {
    if (directoryItems.length === directories.length) {
      const ids = directories.map((directory) => directory.id);
      return this.sortService.sort(directoryItems, {
        primarySort: (a, b) => ids.indexOf(a.directoryId) - ids.indexOf(b.directoryId),
      });
    }
    return directoryItems;
  }

  public updateDirectoryItems(directoryItems: DirectoryItem[], directoryItem: DirectoryItem): void {
    if (directoryItems && directoryItem) {
      this.store.dispatch(
        directoryItemActions.updateOne({
          update: {
            id: directoryItem.id,
            changes: {
              directoryItemIds: directoryItems.map((directoryItem) => directoryItem.id),
            },
          },
        }),
      );
    }
  }

  public updateFileItems(fileItems: FileItem[], directoryItem: DirectoryItem): void {
    if (fileItems && directoryItem) {
      this.store.dispatch(
        directoryItemActions.updateOne({
          update: {
            id: directoryItem.id,
            changes: {
              fileItemIds: fileItems.map((directoryItem) => directoryItem.id),
            },
          },
        }),
      );
    }
  }

  public updateIsOpened(directoryItem: DirectoryItem, isOpened: boolean): void {
    if (directoryItem.isOpened !== isOpened) {
      this.store.dispatch(
        directoryItemActions.updateOne({
          update: {
            id: directoryItem.id,
            changes: {
              isOpened,
            },
          },
        }),
      );
    }
  }
}
