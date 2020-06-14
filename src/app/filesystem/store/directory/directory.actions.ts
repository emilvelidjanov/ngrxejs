import { createAction, props } from '@ngrx/store';
import { PropEntity } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { Directory, directoryAppStateConfig, directoryDomainStateConfig } from './directory.state';

export const directoryActions = {
  ...directoryDomainStateConfig.getActions(),
  ...directoryAppStateConfig.getActions(),
  openDirectory: createAction(
    directoryDomainStateConfig.getActionType('Open Directory'),
    props<PropEntity<Directory>>(),
  ),
};
