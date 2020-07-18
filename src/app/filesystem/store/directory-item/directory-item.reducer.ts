import { Action, createReducer } from '@ngrx/store';

import { directoryDomainStateConfig, DirectoryItems } from './directory-item.state';

const reducer = createReducer(
  directoryDomainStateConfig.getInitialState(),
  ...directoryDomainStateConfig.getReducerFunctions(),
);

export function directoryItemsReducer(state: DirectoryItems | undefined, action: Action) {
  return reducer(state, action);
}
