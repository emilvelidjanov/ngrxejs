import { createAction, props } from '@ngrx/store';
import { PropEntity, PropId } from 'src/app/core/ngrx/store-configurer';

import { Directory, directoryStoreConfig } from './directory.state';

export const directoryActions = {
  ...directoryStoreConfig.getActions(),
  addLoadedDirectoryId: createAction(directoryStoreConfig.getActionType('Add Loaded Directory Id'), props<PropId>()),
  addOpenedDirectoryId: createAction(directoryStoreConfig.getActionType('Add Opened Directory Id'), props<PropId>()),
  removeOpenedDirectoryId: createAction(
    directoryStoreConfig.getActionType('Remove Opened Directory Id'),
    props<PropId>(),
  ),
  openDirectory: createAction(directoryStoreConfig.getActionType('Open Directory'), props<PropEntity<Directory>>()),
};
