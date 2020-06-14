import { Action, createReducer } from '@ngrx/store';

import { projectEntityAppStateConfig, projectEntityStateConfig, Projects } from './project.state';

const reducer = createReducer(
  projectEntityStateConfig.getInitialState(),
  ...projectEntityStateConfig.getReducerFunctions(),
  ...projectEntityAppStateConfig.getReducerFunctions(),
);

export function projectsReducer(state: Projects | undefined, action: Action) {
  return reducer(state, action);
}
