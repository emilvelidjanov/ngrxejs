import { Projects, projectStoreConfig } from './project.state';
import { Action, createReducer } from '@ngrx/store';


const reducer = createReducer(
  projectStoreConfig.getInitialState(),
  ...projectStoreConfig.getReducerFunctions(),
);

export function projectsReducer(state: Projects | undefined, action: Action) {
  return reducer(state, action);
}