import { Observable } from 'rxjs';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';
import { Prop } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { ContextMenu } from '../../store/context-menu/context-menu.state';
import { MenuBar } from '../../store/menu-bar/menu-bar.state';
import { MenuItem } from '../../store/menu-item/menu-item.state';
import { TabBar } from '../../store/tab-bar/tab-bar.state';
import { TabItem } from '../../store/tab-item/tab-item.state';

export interface MenuFacade {
  toggleOpenedMenuItem(menuItem: MenuItem): void;
  addMenuItemsConfig(partials: EntityPartial<MenuItem>[]): void;
  addMenuBarsConfig(partials: EntityPartial<MenuBar>[]): void;
  addContextMenusConfig(partials: EntityPartial<ContextMenu>[]): void;
  addTabBarsConfig(partials: EntityPartial<TabBar>[]): void;
  addTabItemsConfig(partials: EntityPartial<TabItem>[]): void;
  createTabItem(): Observable<TabItem>;
  selectTabBar(id: Id): Observable<TabBar>;
  selectTabItem(id: Id): Observable<TabItem>;
  addTabItemsToTabBar(tabItems: TabItem[], tabBar: TabBar): void;
  removeTabItemsFromTabBar(tabItems: TabItem[], tabBar: TabBar): void;
  removeTabItems(tabItems: TabItem[]): void;
  dispatchClickActionTabItem(tabItem: TabItem): void;
  onClickMenuItem(menuItem: MenuItem): void;
  closeAllMenuItems(): void;
  openContextMenu(contextMenu: ContextMenu, xPosition: number, yPosition: number, contextProps: Prop): void;
  closeContextMenu(contextMenu: ContextMenu): void;
  closeTabItem(tabItem: TabItem): void;
  updateIsDisabledMenuItem(isDisabled: boolean, menuItem: MenuItem): void;
}
