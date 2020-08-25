import { Action, createReducer } from '@ngrx/store';

import { tabItemDomainStateConfig, TabItems } from './tab-item.state';

const reducer = createReducer(tabItemDomainStateConfig.getInitialState(), ...tabItemDomainStateConfig.getReducerFunctions());

export function tabItemsReducer(state: TabItems | undefined, action: Action) {
  return reducer(state, action);
}
