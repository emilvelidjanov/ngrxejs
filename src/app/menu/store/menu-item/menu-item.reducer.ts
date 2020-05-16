import { Action, createReducer } from '@ngrx/store';

import { MenuItems, menuItemStoreConfig } from './menu-item.state';

const reducer = createReducer(menuItemStoreConfig.getInitialState(), ...menuItemStoreConfig.getReducerFunctions());

export function menuItemsReducer(state: MenuItems | undefined, action: Action) {
  return reducer(state, action);
}
