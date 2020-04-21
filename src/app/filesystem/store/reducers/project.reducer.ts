import { projectsInitialState, Projects, projectAdapter } from '../state/project.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as ProjectActions from './../actions/project.action';


const reducer = createReducer(
  projectsInitialState,
  on(ProjectActions.addProject, (state: Projects, {project}) => {
    return projectAdapter.addOne(project, state);
  }),
);

export function projectsReducer(state: Projects | undefined, action: Action) {
  return reducer(state, action);
}