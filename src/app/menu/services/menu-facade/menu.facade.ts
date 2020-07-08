import { ContextMenu } from '../../store/context-menu/context-menu.state';
import { MenuBar } from '../../store/menu-bar/menu-bar.state';
import { MenuItem } from '../../store/menu-item/menu-item.state';

export interface MenuFacade {
  addMenuItemsConfig(menuItems: MenuItem[]): void;
  addMenuBarsConfig(menuBars: MenuBar[]): void;
  addContextMenusConfig(contextMenus: ContextMenu[]): void;
  onClickMenuItem(menuItem: MenuItem): void;
  offClickMenuItemNestedMenuItems(): void;
  openContextMenu(menu: MenuBar, x: number, y: number): void;
  closeContextMenu(menu: MenuBar): void;
}
