import { createAction, props } from '@ngrx/store';
import { PropCoordinates, PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { projectAppStateConfig, projectDomainStateConfig } from './project.state';

export const projectActions = {
  ...projectDomainStateConfig.getActions(),
  ...projectAppStateConfig.getActions(),
  openProject: createAction(projectAppStateConfig.getEffectActionType('Open Project')),
  openContextMenu: createAction(
    projectAppStateConfig.getEffectActionType('Open Context Menu'),
    props<PropId & PropCoordinates>(),
  ),
};
