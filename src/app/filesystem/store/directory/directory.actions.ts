import { createAction, props } from '@ngrx/store';
import { PropEntity } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

import { Directory, directoryEntityAppStateConfig, directoryEntityStateConfig } from './directory.state';

export const directoryActions = {
  ...directoryEntityStateConfig.getActions(),
  ...directoryEntityAppStateConfig.getActions(),
  openDirectory: createAction(
    directoryEntityStateConfig.getActionType('Open Directory'),
    props<PropEntity<Directory>>(),
  ),
};
