import { projectStoreConfig, Projects, Project } from './project.state';
import { selectProjects } from '..';
import { createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Id } from 'src/app/core/ngrx/entity';


const initialState = projectStoreConfig.getInitialState();

const defSelectors = {...projectStoreConfig.getSelectors(selectProjects)};
const selectOpenProjectId = createSelector(selectProjects, (projects: Projects) => projects.openProjectId);
const selectOpenProject = createSelector(selectOpenProjectId, defSelectors.selectEntities, 
  (projectId: Id, projects: Dictionary<Project>) => projectId !== initialState.openProjectId ? projects[projectId] : null);

export const projectSelectors = {
  ...defSelectors,
  selectOpenProjectId: selectOpenProjectId,
  selectOpenProject: selectOpenProject,
};