import { Action, createReducer } from '@ngrx/store';

import { projectDomainStateConfig, ProjectTrees } from './project-tree.state';

const reducer = createReducer(projectDomainStateConfig.getInitialState(), ...projectDomainStateConfig.getReducerFunctions());

export function projectTreesReducer(state: ProjectTrees | undefined, action: Action) {
  return reducer(state, action);
}
