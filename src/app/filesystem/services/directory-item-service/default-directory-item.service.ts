import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable, of } from 'rxjs';
import { map, share, switchMap, take } from 'rxjs/operators';
import { EntityPartial, Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
import { UpdateId } from 'src/app/core/ngrx/entity/entity-domain-state/props';
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
import { Project } from '../../store/project/project.state';
import { DirectoryService } from '../directory-service/directory.service';
import { directoryServiceDep } from '../directory-service/directory.service.dependency';

import { DirectoryItemService } from './directory-item.service';

@Injectable()
export class DefaultDirectoryItemService implements DirectoryItemService {
  private directoryItemIds$: Observable<Id[]>;

  constructor(
    private store: Store<DirectoryItems>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
    @Inject(sortServiceDep.getToken()) private sortService: SortService,
    @Inject(directoryServiceDep.getToken()) private directoryService: DirectoryService,
  ) {
    this.directoryItemIds$ = this.store.pipe(select(directoryItemSelectors.selectIds));
  }

  public removeFileItemsFromMany(fileItems: FileItem[], directoryItems: DirectoryItem[]): void {
    if (fileItems && directoryItems && fileItems.length && directoryItems.length) {
      const fileItemIds = fileItems.map((fileItem) => fileItem.id);
      const parentDirectoryItems = directoryItems.filter((directoryItem) => directoryItem.fileItemIds.some((id) => fileItemIds.includes(id)));
      if (parentDirectoryItems.length) {
        const updates = parentDirectoryItems.map((directoryItem) => {
          const update: UpdateId<DirectoryItem> = {
            id: directoryItem.id,
            changes: {
              fileItemIds: directoryItem.fileItemIds.filter((id) => !fileItemIds.includes(id)),
            },
          };
          return update;
        });
        this.store.dispatch(directoryItemActions.updateMany({ updates }));
      }
    }
  }

  public selectManyByContainFileItems(fileItems: FileItem[]): Observable<DirectoryItem[]> {
    const fileItemIds = fileItems.map((fileItem) => fileItem.id);
    const directoryItems$ = this.store.pipe(
      select(directoryItemSelectors.selectEntitiesByPredicate, {
        predicate: (entity) => entity.fileItemIds.some((id) => fileItemIds.includes(id)),
      }),
    );
    return directoryItems$;
  }

  public removeOne(entity: DirectoryItem): void {
    if (entity) {
      this.store.dispatch(directoryItemActions.removeOne({ id: entity.id }));
    }
  }

  public removeMany(entities: DirectoryItem[]): void {
    if (entities && entities.length) {
      const ids = entities.map((entity) => entity.id);
      this.store.dispatch(directoryItemActions.removeMany({ ids }));
    }
  }

  public selectManyByParentDirectoryItem(directoryItem: DirectoryItem): Observable<DirectoryItem[]> {
    return this.selectMany(directoryItem.directoryItemIds);
  }

  public selectOrCreateManyFromEntities(directories: Directory[], projectTree: ProjectTree): Observable<DirectoryItem[]> {
    const selectItems$ = this.selectByDirectories(directories).pipe(take(1), share());
    const remaining$ = selectItems$.pipe(
      map((items) => items.map((item) => item.directoryId)),
      map((ids) => directories.filter((directory) => !ids.includes(directory.id))),
    );
    const createItems$ = remaining$.pipe(
      switchMap((directories) => this.createManyFromEntities(directories, projectTree)),
      take(1),
    );
    const combine$ = forkJoin([selectItems$, createItems$]).pipe(map(([existing, created]) => [...existing, ...created]));
    return combine$;
  }

  public selectRootOfProject(project: Project): Observable<DirectoryItem> {
    const selectDirectory$ = this.directoryService.selectRootOfProject(project);
    const selectDirectoryItem$ = selectDirectory$.pipe(switchMap((directory) => (directory ? this.selectByDirectory(directory) : of(null))));
    return selectDirectoryItem$;
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
      id: null,
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
      map((directoryItems) => (directoryItems.length ? directoryItems[0] : null)),
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

  public sortByDirectories(directoryItems: DirectoryItem[], directories: Directory[]): DirectoryItem[] {
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
