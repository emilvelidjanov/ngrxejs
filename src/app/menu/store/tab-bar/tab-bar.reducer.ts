import { Action, createReducer } from '@ngrx/store';

import { tabBarDomainStateConfig, TabBars } from './tab-bar.state';

const reducer = createReducer(
  tabBarDomainStateConfig.getInitialState(),
  ...tabBarDomainStateConfig.getReducerFunctions(),
);

export function tabBarsReducer(state: TabBars | undefined, action: Action) {
  return reducer(state, action);
}
