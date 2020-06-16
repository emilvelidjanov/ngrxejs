import { Action, createReducer } from '@ngrx/store';

import { projectAppStateConfig, projectDomainStateConfig, Projects } from './project.state';

const reducer = createReducer(
  projectDomainStateConfig.getInitialState(),
  ...projectDomainStateConfig.getReducerFunctions(),
  ...projectAppStateConfig.getReducerFunctions(),
);

export function projectsReducer(state: Projects | undefined, action: Action) {
  return reducer(state, action);
}
