import { createAction, props } from '@ngrx/store';
import { PropEntity, PropId } from 'src/app/core/ngrx/store-configurer';

import { File, fileStoreConfig } from './file.state';

export const fileActions = {
  ...fileStoreConfig.getActions(),
  addLoadedDirectoryId: createAction(fileStoreConfig.getActionType('Add Loaded Directory Id'), props<PropId>()),
  toggleOpenedDirectoryId: createAction(fileStoreConfig.getActionType('Toggle Opened Directory Id'), props<PropId>()),
  // openDirectoryId: createAction(fileStoreConfig.getActionType('Open Directory Id'), props<PropId>()),
  // closeDirectoryId: createAction(fileStoreConfig.getActionType('Close Directory Id'), props<PropId>()),
  openDirectory: createAction(fileStoreConfig.getActionType('Open Directory'), props<PropEntity<File>>()),
};
