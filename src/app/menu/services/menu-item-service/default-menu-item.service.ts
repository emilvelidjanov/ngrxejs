import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import defaultMenuItems from '../../config/menuItems.json';
import { menuItemActions } from '../../store/menu-item/menu-item.actions';
import { MenuItems } from '../../store/menu-item/menu-item.state';

import { MenuItemService } from './menu-item.service';

@Injectable()
export class DefaultMenuItemServie implements MenuItemService {
  constructor(private store: Store<MenuItems>) {}

  public initMenuItems(): void {
    this.store.dispatch(menuItemActions.addMany({ entities: defaultMenuItems }));
  }
}
