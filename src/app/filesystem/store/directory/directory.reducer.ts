import { Action, createReducer } from '@ngrx/store';

import { Directories, directoryAppStateConfig, directoryDomainStateConfig } from './directory.state';

const reducer = createReducer(
  directoryDomainStateConfig.getInitialState(),
  ...directoryDomainStateConfig.getReducerFunctions(),
  ...directoryAppStateConfig.getReducerFunctions(),
);

export function directoriesReducer(state: Directories | undefined, action: Action) {
  return reducer(state, action);
}
