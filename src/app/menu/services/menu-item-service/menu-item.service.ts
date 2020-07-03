import { MenuItem } from '../../store/menu-item/menu-item.state';

export interface MenuItemService {
  populateOptionals(menuItems: MenuItem[]): MenuItem[];
  addMany(menuItems: MenuItem[]): void;
  open(menuItem: MenuItem): void;
  closeAll(): void;
  dispatchClickAction(menuItem: MenuItem): void;
}
