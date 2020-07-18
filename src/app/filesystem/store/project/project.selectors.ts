import { selectProjects } from '..';

import { projectDomainStateConfig } from './project.state';

const defSelectors = { ...projectDomainStateConfig.getSelectors(selectProjects) };

export const projectSelectors = {
  ...defSelectors,
};
