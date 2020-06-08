import { Action, createReducer } from '@ngrx/store';

import { Files, fileStoreConfig } from './file.state';

const reducer = createReducer(fileStoreConfig.getInitialState(), ...fileStoreConfig.getReducerFunctions());

export function filesReducer(state: Files | undefined, action: Action) {
  return reducer(state, action);
}
