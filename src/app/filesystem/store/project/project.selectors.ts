import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { Id } from 'src/app/core/ngrx/entity-configurer/entity';

import { selectProjects } from '..';

import { Project, projectEntityAppStateConfig, projectEntityStateConfig, Projects } from './project.state';

const defSelectors = { ...projectEntityStateConfig.getSelectors(selectProjects) };
const defAppSelectors = { ...projectEntityAppStateConfig.getSelectors(selectProjects, defSelectors) };
const selectOpenProjectId = createSelector(selectProjects, (projects: Projects) => projects.openProjectId);
const selectOpenProject = createSelector(
  selectOpenProjectId,
  defSelectors.selectEntities,
  (id: Id, projects: Dictionary<Project>) => (id !== null ? projects[id] : null),
);

export const projectSelectors = {
  ...defSelectors,
  ...defAppSelectors,
  selectOpenProjectId,
  selectOpenProject,
};
