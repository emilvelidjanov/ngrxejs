import { MenuItem } from '../../store/menu-item/menu-item.state';

export interface MenuItemService {
  addMenuItems(menuItems: MenuItem[]): void;
}
