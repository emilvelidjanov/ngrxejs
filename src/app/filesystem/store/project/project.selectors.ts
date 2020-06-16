import { selectProjects } from '..';

import { projectAppStateConfig, projectDomainStateConfig } from './project.state';

const defSelectors = { ...projectDomainStateConfig.getSelectors(selectProjects) };
const defAppSelectors = { ...projectAppStateConfig.getSelectors(selectProjects, defSelectors) };

export const projectSelectors = {
  ...defSelectors,
  ...defAppSelectors,
};
