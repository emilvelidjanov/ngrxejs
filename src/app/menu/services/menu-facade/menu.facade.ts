import { MenuItem } from '../../store/menu-item/menu-item.state';
import { Menu } from '../../store/menu/menu.state';

export interface MenuFacade {
  createMenu(menu: Menu, menuItems: MenuItem[]): void;
  click(menuItem: MenuItem): void;
  clickOff(): void;
}
