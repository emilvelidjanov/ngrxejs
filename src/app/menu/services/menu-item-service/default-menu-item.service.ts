import { Injectable } from "@angular/core";
import { MenuItemService } from './menu-item.service';
import { MenuItems } from '../../store/menu-item/menu-item.state';
import { Store } from '@ngrx/store';
import { menuItemActions } from '../../store/menu-item/menu-item.action';
import defaultMenuItems from '../../config/menuItems.json';


@Injectable()
export class DefaultMenuItemServie implements MenuItemService {
  
  constructor(
    private store: Store<MenuItems>,
  ) { }

  initMenuItems(): void {
    this.store.dispatch(menuItemActions.addMany({entities: defaultMenuItems}));
  }
}