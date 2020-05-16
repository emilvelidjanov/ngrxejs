import { Action, createReducer } from '@ngrx/store';

import { Menus, menuStoreConfig } from './menu.state';

const reducer = createReducer(menuStoreConfig.getInitialState(), ...menuStoreConfig.getReducerFunctions());

export function menusReducer(state: Menus | undefined, action: Action) {
  return reducer(state, action);
}
