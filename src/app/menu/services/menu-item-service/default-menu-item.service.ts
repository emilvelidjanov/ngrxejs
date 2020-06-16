import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { menuItemActions } from '../../store/menu-item/menu-item.actions';
import { MenuItem, MenuItems } from '../../store/menu-item/menu-item.state';

import { MenuItemService } from './menu-item.service';

@Injectable()
export class DefaultMenuItemServie implements MenuItemService {
  constructor(private store: Store<MenuItems>) {}

  public addMenuItems(menuItems: MenuItem[]): void {
    this.store.dispatch(menuItemActions.addMany({ entities: menuItems }));
  }
}
