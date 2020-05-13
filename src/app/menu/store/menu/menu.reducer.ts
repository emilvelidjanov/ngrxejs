import { createReducer, Action } from '@ngrx/store';
import { menuStoreConfig, Menus } from './menu.state';


const reducer = createReducer(
  menuStoreConfig.getInitialState(),
  ...menuStoreConfig.getReducerFunctions(),
);

export function menusReducer(state: Menus | undefined, action: Action) {
  return reducer(state, action);
}
