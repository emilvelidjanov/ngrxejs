import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';
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

  public selectByIds(ids: Id[]): Observable<DirectoryItem[]> {
    return this.store.pipe(select(directoryItemSelectors.selectEntitiesByIds, { ids }));
  }

  public select(id: Id): Observable<DirectoryItem> {
    return this.store.pipe(select(directoryItemSelectors.selectEntityById, { id }));
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

  public addOne(directoryItem: DirectoryItem): void {
    this.store.dispatch(directoryItemActions.addOne({ entity: directoryItem }));
  }

  public createOne(directory: Directory, projectTree: ProjectTree): Observable<DirectoryItem> {
    const directoryItem$ = this.directoryItemIds$.pipe(
      map((ids) => this.idGeneratorService.nextId(ids)),
      map((id) => {
        // TODO: use default factory method --> EntityService?
        const directoryItem: DirectoryItem = {
          id,
          directoryId: directory.id,
          fileItemIds: [],
          directoryItemIds: [],
          isOpened: false,
          projectTreeId: projectTree.id,
          createNewInputType: 'none',
        };
        return directoryItem;
      }),
      take(1), // TODO: don't assume take(1)
    );
    return directoryItem$;
  }

  public addMany(directoryItems: DirectoryItem[]): void {
    if (directoryItems && directoryItems.length) {
      this.store.dispatch(directoryItemActions.addMany({ entities: directoryItems }));
    }
  }

  public createMany(directories: Directory[], projectTree: ProjectTree): Observable<DirectoryItem[]> {
    const size = directories.length;
    const directoryItems$ = this.directoryItemIds$.pipe(
      map((ids) => this.idGeneratorService.nextNIds(size, ids)),
      map((ids) =>
        ids.map((id, index) => {
          const directoryItem: DirectoryItem = {
            id,
            directoryId: directories[index].id,
            directoryItemIds: [],
            fileItemIds: [],
            projectTreeId: projectTree.id,
            isOpened: false,
            createNewInputType: 'none',
          };
          return directoryItem;
        }),
      ),
      take(1),
    );
    return directoryItems$;
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

  public setDirectoryItems(directoryItems: DirectoryItem[], directoryItem: DirectoryItem): void {
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
