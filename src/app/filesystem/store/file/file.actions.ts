import { createAction, props } from '@ngrx/store';
import { PropEntity } from 'src/app/core/ngrx/store-configurer';

import { File, fileStoreConfig } from './file.state';

export const fileActions = {
  ...fileStoreConfig.getActions(),
  openFile: createAction(fileStoreConfig.getActionType('Open File'), props<PropEntity<File>>()),
};
