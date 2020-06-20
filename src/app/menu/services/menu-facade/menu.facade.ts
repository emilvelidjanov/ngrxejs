import { MenuItem } from '../../store/menu-item/menu-item.state';
import { Menu } from '../../store/menu/menu.state';

export interface MenuFacade {
  addMenus(menus: Menu[], menuItems: MenuItem[]): void;
  onClickMenuItem(menuItem: MenuItem): void;
  onClickOffNestedMenuItems(htmlNodeName: string): void;
}
