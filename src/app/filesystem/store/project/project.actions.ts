import { createAction } from '@ngrx/store';

import { projectAppStateConfig, projectDomainStateConfig } from './project.state';

export const projectActions = {
  ...projectDomainStateConfig.getActions(),
  ...projectAppStateConfig.getActions(),
  openProject: createAction(projectAppStateConfig.getActionType('Open Project')),
};
