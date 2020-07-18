import { selectProjectTrees } from '..';

import { projectDomainStateConfig } from './project-tree.state';

const defSelectors = { ...projectDomainStateConfig.getSelectors(selectProjectTrees) };

export const projectTreeSelectors = {
  ...defSelectors,
};
