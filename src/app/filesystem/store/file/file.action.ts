import { fileStoreConfig } from './file.state';
import { createAction, props } from '@ngrx/store';
import { PropId } from 'src/app/core/ngrx/store-configurer';


export const fileActions = {
  ...fileStoreConfig.getActions(),
  addLoadedDirectoryId: createAction(fileStoreConfig.getActionType("Add Loaded Directory Id"), props<PropId>()),
  toggleOpenedDirectoryId: createAction(fileStoreConfig.getActionType("Toggle Opened Directory Id"), props<PropId>()),
};