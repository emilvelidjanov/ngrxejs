import { createAction, props } from '@ngrx/store';
import { PropEntity } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

import { File, fileEntityAppStateConfig, fileEntityStateConfig } from './file.state';

export const fileActions = {
  ...fileEntityStateConfig.getActions(),
  ...fileEntityAppStateConfig.getActions(),
  openFile: createAction(fileEntityStateConfig.getActionType('Open File'), props<PropEntity<File>>()),
};
