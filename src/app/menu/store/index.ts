import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { contextMenusReducer } from './context-menu/context-menu.reducer';
import { ContextMenus } from './context-menu/context-menu.state';
import { menuBarsReducer } from './menu-bar/menu-bar.reducer';
import { MenuBars } from './menu-bar/menu-bar.state';
import { menuItemsReducer } from './menu-item/menu-item.reducer';
import { MenuItems } from './menu-item/menu-item.state';

export const menuFeatureKey = 'menu';

export interface MenuState {
  menuItems: MenuItems;
  menuBars: MenuBars;
  contextMenus: ContextMenus;
}

export const reducers: ActionReducerMap<MenuState> = {
  menuItems: menuItemsReducer,
  menuBars: menuBarsReducer,
  contextMenus: contextMenusReducer,
};

export const metaReducers: MetaReducer<MenuState>[] = !environment.production ? [] : [];

export const selectMenuFeature = createFeatureSelector<MenuState>(menuFeatureKey);
export const selectMenuItems = createSelector(selectMenuFeature, (state) => state.menuItems);
export const selectMenus = createSelector(selectMenuFeature, (state) => state.menuBars);
export const selectContextMenus = createSelector(selectMenuFeature, (state) => state.contextMenus);
