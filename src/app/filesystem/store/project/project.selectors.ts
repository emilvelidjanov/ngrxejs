import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { Id } from 'src/app/core/ngrx/entity';

import { selectProjects } from '..';

import { Project, Projects, projectStoreConfig } from './project.state';

const defSelectors = { ...projectStoreConfig.getSelectors(selectProjects) };
const selectOpenProjectId = createSelector(selectProjects, (projects: Projects) => projects.openProjectId);
const selectOpenProject = createSelector(
  selectOpenProjectId,
  defSelectors.selectEntities,
  (id: Id, projects: Dictionary<Project>) => (id !== null ? projects[id] : null),
);

export const projectSelectors = {
  ...defSelectors,
  selectOpenProjectId,
  selectOpenProject,
};
