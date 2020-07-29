import { EntityPartial } from 'src/app/core/ngrx/entity/entity';

import { ContextMenu } from '../../store/context-menu/context-menu.state';
import { MenuBar } from '../../store/menu-bar/menu-bar.state';
import { MenuItem } from '../../store/menu-item/menu-item.state';
import { TabBar } from '../../store/tab-bar/tab-bar.state';

export interface MenuFacade {
  addMenuItemsConfig(partials: EntityPartial<MenuItem>[]): void;
  addMenuBarsConfig(partials: EntityPartial<MenuBar>[]): void;
  addContextMenusConfig(partials: EntityPartial<ContextMenu>[]): void;
  addTabBarsConfig(partials: EntityPartial<TabBar>[]): void;
  onClickMenuItem(menuItem: MenuItem): void;
  offClickMenuItemNestedMenuItems(): void;
  openContextMenu(contextMenu: ContextMenu, xPosition: number, yPosition: number): void;
  closeContextMenu(contextMenu: ContextMenu): void;
}
