import { Action, createReducer } from '@ngrx/store';

import { menuDomainStateConfig, Menus } from './menu.state';

const reducer = createReducer(menuDomainStateConfig.getInitialState(), ...menuDomainStateConfig.getReducerFunctions());

export function menusReducer(state: Menus | undefined, action: Action) {
  return reducer(state, action);
}
