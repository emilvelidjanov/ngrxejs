import { Action, createReducer } from '@ngrx/store';

import { directoryItemDomainStateConfig, DirectoryItems } from './directory-item.state';

const reducer = createReducer(directoryItemDomainStateConfig.getInitialState(), ...directoryItemDomainStateConfig.getReducerFunctions());

export function directoryItemsReducer(state: DirectoryItems | undefined, action: Action) {
  return reducer(state, action);
}
