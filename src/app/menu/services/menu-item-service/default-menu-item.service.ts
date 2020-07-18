import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { menuItemActions } from '../../store/menu-item/menu-item.actions';
import { MenuItem, MenuItems } from '../../store/menu-item/menu-item.state';

import { MenuItemService } from './menu-item.service';

@Injectable()
export class DefaultMenuItemService implements MenuItemService {
  constructor(private store: Store<MenuItems>) {}

  public populateOptionals(partialMenuItems: Partial<MenuItem>[]): MenuItem[] {
    const result: MenuItem[] = partialMenuItems.map((menuItem: MenuItem) => {
      if (menuItem.isOpened === undefined) {
        menuItem.isOpened = false;
      }
      if (menuItem.menuItemIds === undefined) {
        menuItem.menuItemIds = null;
      }
      if (menuItem.clickAction === undefined) {
        menuItem.clickAction = null;
      }
      return { ...menuItem };
    });
    return result;
  }

  public addMany(menuItems: MenuItem[]): void {
    this.store.dispatch(menuItemActions.addMany({ entities: menuItems }));
  }

  public open(menuItem: MenuItem): void {
    if (menuItem.menuItemIds && menuItem.menuItemIds.length && !menuItem.isOpened) {
      this.store.dispatch(
        menuItemActions.updateOne({
          update: {
            id: menuItem.id as number,
            changes: {
              isOpened: true,
            },
          },
        }),
      );
    }
  }

  public dispatchClickAction(menuItem: MenuItem): void {
    if (menuItem.clickAction) {
      this.store.dispatch(menuItem.clickAction);
    }
  }

  public closeAll(): void {
    this.store.dispatch(
      menuItemActions.updateAll({
        partial: {
          isOpened: false,
        },
      }),
    );
  }
}
