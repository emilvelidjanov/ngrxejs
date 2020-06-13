import { createAction, props } from '@ngrx/store';
import { PropId } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

import { projectEntityStateConfig } from './project.state';

export const projectActions = {
  ...projectEntityStateConfig.getActions(),
  setOpenProjectId: createAction(projectEntityStateConfig.getActionType('Set Open Project Id'), props<PropId>()),
  openProject: createAction(projectEntityStateConfig.getActionType('Open Project')),
};
