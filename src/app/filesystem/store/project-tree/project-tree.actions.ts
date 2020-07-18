import { createAction, props } from '@ngrx/store';
import { PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { projectDomainStateConfig } from './project-tree.state';

export const projectTreeActions = {
  ...projectDomainStateConfig.getActions(),
  openProject: createAction(projectDomainStateConfig.getEffectActionType('Open Project'), props<PropId>()),
};
