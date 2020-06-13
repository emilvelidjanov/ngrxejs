import { Action, createReducer } from '@ngrx/store';

import { menuEntityStateConfig, Menus } from './menu.state';

const reducer = createReducer(menuEntityStateConfig.getInitialState(), ...menuEntityStateConfig.getReducerFunctions());

export function menusReducer(state: Menus | undefined, action: Action) {
  return reducer(state, action);
}
