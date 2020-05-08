import { Projects, projectStoreConfig } from './project.state';
import { Action, createReducer, on } from '@ngrx/store';
import { projectActions } from './project.action';


const reducer = createReducer(
  projectStoreConfig.getInitialState(),
  ...projectStoreConfig.getReducerFunctions(),
  on(projectActions.setOpenProjectId, (state: Projects, {id}) => {
    return {...state, openProjectId: id};
  }),
);

export function projectsReducer(state: Projects | undefined, action: Action) {
  return reducer(state, action);
}