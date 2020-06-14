import { createAction } from '@ngrx/store';

import { projectEntityAppStateConfig, projectEntityStateConfig } from './project.state';

export const projectActions = {
  ...projectEntityStateConfig.getActions(),
  ...projectEntityAppStateConfig.getActions(),
  openProject: createAction(projectEntityStateConfig.getActionType('Open Project')),
};
