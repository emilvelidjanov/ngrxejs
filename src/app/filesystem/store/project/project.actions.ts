import { projectDomainStateConfig } from './project.state';

export const projectActions = {
  ...projectDomainStateConfig.getActions(),
};
