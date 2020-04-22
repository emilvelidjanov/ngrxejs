import { Projects, projectStoreConfig } from './project.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as ProjectActions from './project.action';


const projectsInitialState = projectStoreConfig.getInitialState();
const projectAdapter = projectStoreConfig.getAdapter();

const reducer = createReducer(
  projectsInitialState,
  on(ProjectActions.addProject, (state: Projects, {project}) => {
    return projectAdapter.addOne(project, state);
  }),
);

export function projectsReducer(state: Projects | undefined, action: Action) {
  return reducer(state, action);
}