import { Action, createReducer } from '@ngrx/store';

import { menuBarDomainStateConfig, MenuBars } from './menu-bar.state';

const reducer = createReducer(
  menuBarDomainStateConfig.getInitialState(),
  ...menuBarDomainStateConfig.getReducerFunctions(),
);

export function menuBarsReducer(state: MenuBars | undefined, action: Action) {
  return reducer(state, action);
}
