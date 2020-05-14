import { fileStoreConfig, File } from './file.state';
import { createAction, props } from '@ngrx/store';
import { PropId, PropEntity } from 'src/app/core/ngrx/store-configurer';


export const fileActions = {
  ...fileStoreConfig.getActions(),
  addLoadedDirectoryId: createAction(fileStoreConfig.getActionType('Add Loaded Directory Id'), props<PropId>()),
  toggleOpenedDirectoryId: createAction(fileStoreConfig.getActionType('Toggle Opened Directory Id'), props<PropId>()),
  openDirectory: createAction(fileStoreConfig.getActionType('Open Directory'), props<PropEntity<File>>()),
};
