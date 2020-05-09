import { createReducer, Action } from '@ngrx/store';
import { modelStoreConfig, Models } from './model.state';


const reducer = createReducer(
  modelStoreConfig.getInitialState(),
  ...modelStoreConfig.getReducerFunctions(),
);

export function modelsReducer(state: Models | undefined, action: Action) {
  return reducer(state, action);
}