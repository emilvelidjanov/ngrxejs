import { createReducer, Action, on } from '@ngrx/store';
import { modelStoreConfig, Models } from './model.state';
import { modelActions } from './model.action';


const reducer = createReducer(
  modelStoreConfig.getInitialState(),
  ...modelStoreConfig.getReducerFunctions(),
  /** Custom reducer functions */
  on(modelActions.setSelectedModelIds, (state: Models, {ids}) => {
    return {...state, openProjectId: ids};
  }),
);

export function modelsReducer(state: Models | undefined, action: Action) {
  return reducer(state, action);
}