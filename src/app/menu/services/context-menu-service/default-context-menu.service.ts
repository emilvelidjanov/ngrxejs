import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';

import { contextMenuActions } from '../../store/context-menu/context-menu.actions';
import { ContextMenu, ContextMenus } from '../../store/context-menu/context-menu.state';

import { ContextMenuService } from './context-menu.service';

@Injectable()
export class DefaultContextMenuService implements ContextMenuService {
  constructor(private store: Store<ContextMenus>) {}

  public createFromPartial(partial: EntityPartial<ContextMenu>): ContextMenu {
    const contextMenu: ContextMenu = {
      isOpened: false,
      menuItemIds: [],
      x: 0,
      y: 0,
      contextRef: null,
      ...partial,
    };
    return contextMenu;
  }

  public addMany(contextMenus: ContextMenu[]): void {
    if (contextMenus && contextMenus.length) {
      this.store.dispatch(contextMenuActions.addMany({ entities: contextMenus }));
    }
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

  public updateContextRef(contextRef: Id, contextMenu: ContextMenu): void {
    if (contextRef !== undefined && contextRef !== contextMenu.contextRef) {
      this.store.dispatch(
        contextMenuActions.updateOne({
          update: {
            id: contextMenu.id,
            changes: {
              contextRef,
            },
          },
        }),
      );
    }
  }
}
