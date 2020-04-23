import { Files, fileStoreConfig } from './file.state';
import { createReducer, Action } from '@ngrx/store';


const reducer = createReducer(
  fileStoreConfig.getInitialState(),
  ...fileStoreConfig.getReducerFunctions(),
);

export function filesReducer(state: Files | undefined, action: Action) {
  return reducer(state, action);
}