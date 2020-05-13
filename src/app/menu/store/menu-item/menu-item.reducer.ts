import { createReducer, Action } from '@ngrx/store';
import { menuItemStoreConfig, MenuItems } from './menu-item.state';


const reducer = createReducer(
  menuItemStoreConfig.getInitialState(),
  ...menuItemStoreConfig.getReducerFunctions(),
);

export function menuItemsReducer(state: MenuItems | undefined, action: Action) {
  return reducer(state, action);
}
