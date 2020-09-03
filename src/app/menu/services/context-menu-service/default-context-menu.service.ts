import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { EntityPartial, Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
import { Prop } from 'src/app/core/ngrx/entity/entity-domain-state/props';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { uuidGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { contextMenuActions } from '../../store/context-menu/context-menu.actions';
import { contextMenuSelectors } from '../../store/context-menu/context-menu.selectors';
import { ContextMenu, ContextMenus } from '../../store/context-menu/context-menu.state';

import { ContextMenuService } from './context-menu.service';

@Injectable()
export class DefaultContextMenuService implements ContextMenuService {
  constructor(private store: Store<ContextMenus>, @Inject(uuidGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService) {}

  public createDefault(partial: EntityPartial<ContextMenu>): ContextMenu {
    const contextMenu: ContextMenu = {
      id: null,
      menuItemIds: [],
      isOpened: false,
      x: 0,
      y: 0,
      contextProps: null,
      ...partial,
    };
    return contextMenu;
  }

  public createOne(partial: IdLessPartial<ContextMenu>): Observable<ContextMenu> {
    const uuid = this.idGeneratorService.nextId();
    return of(this.createDefault({ id: uuid, ...partial }));
  }

  public createMany(partials: IdLessPartial<ContextMenu>[]): Observable<ContextMenu[]> {
    const uuids = this.idGeneratorService.nextNIds(partials.length);
    const entities = uuids.map((uuid, index) => {
      const partial = partials[index];
      return this.createDefault({ id: uuid, ...partial });
    });
    return of(entities);
  }

  public addOne(entity: ContextMenu): void {
    if (entity) {
      this.store.dispatch(contextMenuActions.addOne({ entity }));
    }
  }

  public addMany(entities: ContextMenu[]): void {
    if (entities && entities.length) {
      this.store.dispatch(contextMenuActions.addMany({ entities }));
    }
  }

  public selectOne(id: Id): Observable<ContextMenu> {
    return this.store.pipe(select(contextMenuSelectors.selectEntityById, { id }));
  }

  public selectMany(ids: Id[]): Observable<ContextMenu[]> {
    return this.store.pipe(select(contextMenuSelectors.selectEntitiesByIds, { ids }));
  }

  public open(contextMenu: ContextMenu, x: number, y: number): void {
    if (contextMenu.menuItemIds && contextMenu.menuItemIds.length) {
      this.store.dispatch(
        contextMenuActions.updateOne({
          update: {
            id: contextMenu.id,
            changes: {
              isOpened: true,
              x,
              y,
            },
          },
        }),
      );
    }
  }

  public closeAll(): void {
    this.store.dispatch(
      contextMenuActions.updateAll({
        partial: {
          isOpened: false,
        },
      }),
    );
  }

  public close(contextMenu: ContextMenu): void {
    if (contextMenu && contextMenu.isOpened) {
      this.store.dispatch(
        contextMenuActions.updateOne({
          update: {
            id: contextMenu.id,
            changes: {
              isOpened: false,
            },
          },
        }),
      );
    }
  }

  public updateContextProps(contextProps: Prop, contextMenu: ContextMenu): void {
    if (contextProps && contextMenu) {
      this.store.dispatch(
        contextMenuActions.updateOne({
          update: {
            id: contextMenu.id,
            changes: {
              contextProps,
            },
          },
        }),
      );
    }
  }
}
