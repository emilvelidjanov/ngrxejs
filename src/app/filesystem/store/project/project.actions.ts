import { createAction, props } from '@ngrx/store';
import { PropId } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

import { projectEntityAppStateConfig, projectEntityStateConfig } from './project.state';

export const projectActions = {
  ...projectEntityStateConfig.getActions(),
  ...projectEntityAppStateConfig.getActions(),
  setOpenProjectId: createAction(projectEntityStateConfig.getActionType('Set Open Project Id'), props<PropId>()),
  openProject: createAction(projectEntityStateConfig.getActionType('Open Project')),
};
