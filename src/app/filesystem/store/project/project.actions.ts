import { createAction } from '@ngrx/store';

import { projectAppStateConfig, projectDomainStateConfig } from './project.state';

export const projectActions = {
  ...projectDomainStateConfig.getActions(),
  ...projectAppStateConfig.getActions(),
  openProject: createAction(projectDomainStateConfig.getActionType('Open Project')),
};
