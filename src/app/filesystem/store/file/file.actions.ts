import { createAction, props } from '@ngrx/store';
import { PropEntity, PropId } from 'src/app/core/ngrx/store-configurer';

import { File, fileStoreConfig } from './file.state';

export const fileActions = {
  ...fileStoreConfig.getActions(),
  openFile: createAction(fileStoreConfig.getActionType('Open File'), props<PropEntity<File>>()),
  addLoadedFileId: createAction(fileStoreConfig.getActionType('Add Loaded File Id'), props<PropId>()),
  addOpenedFileId: createAction(fileStoreConfig.getActionType('Add Opened File Id'), props<PropId>()),
  setFocusedFileId: createAction(fileStoreConfig.getActionType('Set Focused File Id'), props<PropId>()),
};
