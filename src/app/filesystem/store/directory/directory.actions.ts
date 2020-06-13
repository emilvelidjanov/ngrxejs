import { createAction, props } from '@ngrx/store';
import { PropEntity, PropId } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

import { Directory, directoryEntityAppStateConfig, directoryEntityStateConfig } from './directory.state';

export const directoryActions = {
  ...directoryEntityStateConfig.getActions(),
  ...directoryEntityAppStateConfig.getActions(),
  addLoadedDirectoryId: createAction(
    directoryEntityStateConfig.getActionType('Add Loaded Directory Id'),
    props<PropId>(),
  ),
  addOpenedDirectoryId: createAction(
    directoryEntityStateConfig.getActionType('Add Opened Directory Id'),
    props<PropId>(),
  ),
  removeOpenedDirectoryId: createAction(
    directoryEntityStateConfig.getActionType('Remove Opened Directory Id'),
    props<PropId>(),
  ),
  openDirectory: createAction(
    directoryEntityStateConfig.getActionType('Open Directory'),
    props<PropEntity<Directory>>(),
  ),
};
