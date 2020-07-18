import { ContextMenu } from '../../store/context-menu/context-menu.state';
import { MenuBar } from '../../store/menu-bar/menu-bar.state';
import { MenuItem } from '../../store/menu-item/menu-item.state';

export interface MenuFacade {
  addMenuItemsConfig(partialMenuItems: Partial<MenuItem>[]): void;
  addMenuBarsConfig(partialMenuBars: Partial<MenuBar>[]): void;
  addContextMenusConfig(partialContextMenus: Partial<ContextMenu>[]): void;
  onClickMenuItem(menuItem: MenuItem): void;
  offClickMenuItemNestedMenuItems(): void;
  openContextMenu(contextMenu: ContextMenu, xPosition: number, yPosition: number): void;
  closeContextMenu(contextMenu: ContextMenu): void;
}
