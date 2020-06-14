import { Action, createReducer } from '@ngrx/store';

import { fileEntityAppStateConfig, fileEntityStateConfig, Files } from './file.state';

const reducer = createReducer(
  fileEntityStateConfig.getInitialState(),
  ...fileEntityStateConfig.getReducerFunctions(),
  ...fileEntityAppStateConfig.getReducerFunctions(),
);

export function filesReducer(state: Files | undefined, action: Action) {
  return reducer(state, action);
}
