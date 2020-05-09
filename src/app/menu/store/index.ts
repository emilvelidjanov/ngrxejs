import { MenuItems } from './menu-item/menu-item.state';
import { ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { menuItemsReducer } from './menu-item/menu-item.reducer';
import { menusReducer } from './menu/menu.reducer';
import { environment } from 'src/environments/environment';
import { Menus } from './menu/menu.state';


export const menuFeatureKey = 'menu';

export interface MenuState {
  menuItems: MenuItems,
  menus: Menus,
}

export const reducers: ActionReducerMap<MenuState> = {
  menuItems: menuItemsReducer,
  menus: menusReducer,
};

export const metaReducers: MetaReducer<MenuState>[] = !environment.production ? [] : [];

export const selectMenuFeature = createFeatureSelector<MenuState>(menuFeatureKey);
export const selectMenuItems = createSelector(selectMenuFeature, (state: MenuState) => state.menuItems);
export const selectMenus = createSelector(selectMenuFeature, (state: MenuState) => state.menus);