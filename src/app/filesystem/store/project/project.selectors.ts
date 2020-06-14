import { selectProjects } from '..';

import { projectEntityAppStateConfig, projectEntityStateConfig } from './project.state';

const defSelectors = { ...projectEntityStateConfig.getSelectors(selectProjects) };
const defAppSelectors = { ...projectEntityAppStateConfig.getSelectors(selectProjects, defSelectors) };

export const projectSelectors = {
  ...defSelectors,
  ...defAppSelectors,
};
