import { Action, createReducer } from '@ngrx/store';

import { menuAppStateConfig, menuDomainStateConfig, Menus } from './menu.state';

const reducer = createReducer(
  menuDomainStateConfig.getInitialState(),
  ...menuDomainStateConfig.getReducerFunctions(),
  ...menuAppStateConfig.getReducerFunctions(),
);

export function menusReducer(state: Menus | undefined, action: Action) {
  return reducer(state, action);
}
