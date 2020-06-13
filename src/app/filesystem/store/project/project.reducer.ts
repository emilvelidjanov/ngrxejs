import { Action, createReducer, on } from '@ngrx/store';
import { PropId } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

import { projectActions } from './project.actions';
import { projectEntityAppStateConfig, projectEntityStateConfig, Projects } from './project.state';

const reducer = createReducer(
  projectEntityStateConfig.getInitialState(),
  ...projectEntityStateConfig.getReducerFunctions(),
  ...projectEntityAppStateConfig.getReducerFunctions(),
  on(projectActions.setOpenProjectId, (state: Projects, props: PropId) => {
    return { ...state, openProjectId: props.id };
  }),
);

export function projectsReducer(state: Projects | undefined, action: Action) {
  return reducer(state, action);
}
