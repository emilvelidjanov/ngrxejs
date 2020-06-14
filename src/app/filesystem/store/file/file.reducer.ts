import { Action, createReducer } from '@ngrx/store';

import { fileAppStateConfig, fileDomainStateConfig, Files } from './file.state';

const reducer = createReducer(
  fileDomainStateConfig.getInitialState(),
  ...fileDomainStateConfig.getReducerFunctions(),
  ...fileAppStateConfig.getReducerFunctions(),
);

export function filesReducer(state: Files | undefined, action: Action) {
  return reducer(state, action);
}
