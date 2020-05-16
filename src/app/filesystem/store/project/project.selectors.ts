import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { Id } from 'src/app/core/ngrx/entity';

import { selectProjects } from '..';

import { Project, Projects, projectStoreConfig } from './project.state';

const initialState = projectStoreConfig.getInitialState();

const defSelectors = { ...projectStoreConfig.getSelectors(selectProjects) };
const selectOpenProjectId = createSelector(selectProjects, (projects: Projects) => projects.openProjectId);
const selectOpenProject = createSelector(
  selectOpenProjectId,
  defSelectors.selectEntities,
  (projectId: Id, projects: Dictionary<Project>) =>
    projectId !== initialState.openProjectId ? projects[projectId] : null,
);

export const projectSelectors = {
  ...defSelectors,
  selectOpenProjectId,
  selectOpenProject,
};
