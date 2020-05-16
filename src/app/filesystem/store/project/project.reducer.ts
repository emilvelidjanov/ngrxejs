import { Action, createReducer, on } from '@ngrx/store';
import { PropId } from 'src/app/core/ngrx/store-configurer';

import { projectActions } from './project.actions';
import { Projects, projectStoreConfig } from './project.state';

const reducer = createReducer(
  projectStoreConfig.getInitialState(),
  ...projectStoreConfig.getReducerFunctions(),
  on(projectActions.setOpenProjectId, (state: Projects, props: PropId) => {
    return { ...state, openProjectId: props.id };
  }),
);

export function projectsReducer(state: Projects | undefined, action: Action) {
  return reducer(state, action);
}
