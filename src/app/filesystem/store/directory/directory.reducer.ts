import { Action, createReducer } from '@ngrx/store';

import { Directories, directoryDomainStateConfig } from './directory.state';

const reducer = createReducer(
  directoryDomainStateConfig.getInitialState(),
  ...directoryDomainStateConfig.getReducerFunctions(),
);

export function directoriesReducer(state: Directories | undefined, action: Action) {
  return reducer(state, action);
}
