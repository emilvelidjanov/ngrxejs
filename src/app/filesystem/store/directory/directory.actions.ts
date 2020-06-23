import { createAction, props } from '@ngrx/store';
import { PropCoordinates, PropEntity, PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { Directory, directoryAppStateConfig, directoryDomainStateConfig } from './directory.state';

export const directoryActions = {
  ...directoryDomainStateConfig.getActions(),
  ...directoryAppStateConfig.getActions(),
  openDirectory: createAction(
    directoryAppStateConfig.getEffectActionType('Open Directory'),
    props<PropEntity<Directory>>(),
  ),
  openContextMenu: createAction(
    directoryAppStateConfig.getEffectActionType('Open Context Menu'),
    props<PropId & PropCoordinates>(),
  ),
};
