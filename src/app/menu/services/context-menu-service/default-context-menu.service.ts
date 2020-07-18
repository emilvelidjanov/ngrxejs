import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { contextMenuActions } from '../../store/context-menu/context-menu.actions';
import { ContextMenu, ContextMenus } from '../../store/context-menu/context-menu.state';

import { ContextMenuService } from './context-menu.service';

@Injectable()
export class DefaultContextMenuService implements ContextMenuService {
  constructor(private store: Store<ContextMenus>) {}

  public populateOptionals(partialContextMenus: Partial<ContextMenu>[]): ContextMenu[] {
    const result: ContextMenu[] = partialContextMenus.map((contextMenu: ContextMenu) => {
      if (contextMenu.isOpened === undefined) {
        contextMenu.isOpened = false;
      }
      if (contextMenu.x === undefined) {
        contextMenu.x = 0;
      }
      if (contextMenu.y === undefined) {
        contextMenu.y = 0;
      }
      return { ...contextMenu };
    });
    return result;
  }

  public addMany(contextMenus: ContextMenu[]): void {
    this.store.dispatch(contextMenuActions.addMany({ entities: contextMenus }));
  }

  public open(contextMenu: ContextMenu): void {
    if (contextMenu.menuItemIds && contextMenu.menuItemIds.length) {
      this.store.dispatch(
        contextMenuActions.updateOne({
          update: {
            id: contextMenu.id as string,
            changes: {
              isOpened: true,
            },
          },
        }),
      );
    }
  }

  public updatePosition(contextMenu: ContextMenu, x: number, y: number): void {
    this.store.dispatch(
      contextMenuActions.updateOne({
        update: {
          id: contextMenu.id as string,
          changes: {
            x,
            y,
          },
        },
      }),
    );
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
          id: contextMenu.id as string,
          changes: {
            isOpened: false,
          },
        },
      }),
    );
  }
}
