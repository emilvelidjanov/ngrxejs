import { Id } from 'src/app/core/ngrx/entity/entity';

import { MenuItem } from '../../store/menu-item/menu-item.state';
import { Menu } from '../../store/menu/menu.state';

export interface MenuFacade {
  addMenus(menus: Menu[], menuItems: MenuItem[]): void;
  clickMenuItem(menuItem: MenuItem): void;
  offClickMenuItem(htmlNodeName: string): void;
  openContextMenu(menuId: Id, x: number, y: number): void;
  closeMenu(menuId: Id): void;
}
