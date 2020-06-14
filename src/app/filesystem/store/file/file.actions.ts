import { createAction, props } from '@ngrx/store';
import { PropEntity } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { File, fileAppStateConfig, fileDomainStateConfig } from './file.state';

export const fileActions = {
  ...fileDomainStateConfig.getActions(),
  ...fileAppStateConfig.getActions(),
  openFile: createAction(fileDomainStateConfig.getActionType('Open File'), props<PropEntity<File>>()),
};
