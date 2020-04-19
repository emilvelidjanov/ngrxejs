import { projectsInitialState, Projects, projectAdapter, Project } from '../state/project.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as ProjectActions from '../actions/file.action';


const reducer = createReducer(
  projectsInitialState,
  on(ProjectActions.addProject, (state: Projects, {project}) => {
    return projectAdapter.addOne(project, state);
  }),
);

export function projectsReducer(state: Projects | undefined, action: Action) {
  return reducer(state, action);
}

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = projectAdapter.getSelectors();

export const selectAllProjects = selectAll;
export const selectProjectEntities = selectEntities;
export const selectProjectIds = selectIds;
export const selectProjectTotal = selectTotal;