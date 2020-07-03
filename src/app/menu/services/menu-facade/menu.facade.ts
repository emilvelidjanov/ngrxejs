import { MenuItem } from '../../store/menu-item/menu-item.state';
import { Menu } from '../../store/menu/menu.state';

export interface MenuFacade {
  addMenusConfiguration(menus: Menu[], menuItems: MenuItem[]): void;
  onClickMenuItem(menuItem: MenuItem): void;
  offClickMenuItemNestedMenuItems(): void;
  openContextMenu(menu: Menu, x: number, y: number): void;
  closeMenu(menu: Menu): void;
}
