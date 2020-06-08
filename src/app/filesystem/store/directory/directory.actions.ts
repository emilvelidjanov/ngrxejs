import { createAction, props } from '@ngrx/store';
import { PropEntity, PropId } from 'src/app/core/ngrx/store-configurer';

import { Directory, directoryStoreConfig } from './directory.state';

export const directoryActions = {
  ...directoryStoreConfig.getActions(),
  addLoadedDirectoryId: createAction(directoryStoreConfig.getActionType('Add Loaded Directory Id'), props<PropId>()),
  toggleOpenedDirectoryId: createAction(
    directoryStoreConfig.getActionType('Toggle Opened Directory Id'),
    props<PropId>(),
  ),
  openDirectory: createAction(directoryStoreConfig.getActionType('Open Directory'), props<PropEntity<Directory>>()),
};
