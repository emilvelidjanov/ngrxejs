import { Observable } from 'rxjs';

import { MenuItem } from '../../store/menu-item/menu-item.state';

export interface MenuItemService {
  addMenuItems(menuItems: MenuItem[]): void;
  dispatchToggleOpenedMenuItem(menuItem: MenuItem): void;
  dispatchOpenedMenuItem(menuItem: MenuItem): void;
  dispatchClosedMenuItem(menuItem: MenuItem): void;
  dispatchCloseAll(): void;
  dispatchMenuItemClickAction(menuItem: MenuItem): void;
  selectIsOpenedMenuItem(menuItem): Observable<boolean>;
}
