import { createAction, props } from '@ngrx/store';
import { PropCoordinates, PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { fileAppStateConfig, fileDomainStateConfig } from './file.state';

export const fileActions = {
  ...fileDomainStateConfig.getActions(),
  ...fileAppStateConfig.getActions(),
  openContextMenu: createAction(
    fileAppStateConfig.getEffectActionType('Open Context Menu'),
    props<PropId & PropCoordinates>(),
  ),
};
