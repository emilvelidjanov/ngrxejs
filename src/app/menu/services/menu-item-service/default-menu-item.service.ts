import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { menuItemActions } from '../../store/menu-item/menu-item.actions';
import { MenuItem, MenuItems } from '../../store/menu-item/menu-item.state';

import { MenuItemService } from './menu-item.service';

@Injectable()
export class DefaultMenuItemService implements MenuItemService {
  constructor(private store: Store<MenuItems>) {}

  public populateOptionals(menuItems: MenuItem[]): MenuItem[] {
    menuItems.forEach((menuItem: MenuItem) => {
      if (menuItem.isOpened === undefined) {
        menuItem.isOpened = false;
      }
    });
    return [...menuItems];
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
      this.store.dispatch({ type: menuItem.clickAction });
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
