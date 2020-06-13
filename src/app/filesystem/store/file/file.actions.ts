import { createAction, props } from '@ngrx/store';
import { PropEntity, PropId } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

import { File, fileEntityAppStateConfig, fileEntityStateConfig } from './file.state';

export const fileActions = {
  ...fileEntityStateConfig.getActions(),
  ...fileEntityAppStateConfig.getActions(),
  openFile: createAction(fileEntityStateConfig.getActionType('Open File'), props<PropEntity<File>>()),
  addLoadedFileId: createAction(fileEntityStateConfig.getActionType('Add Loaded File Id'), props<PropId>()),
  addOpenedFileId: createAction(fileEntityStateConfig.getActionType('Add Opened File Id'), props<PropId>()),
  setFocusedFileId: createAction(fileEntityStateConfig.getActionType('Set Focused File Id'), props<PropId>()),
};
