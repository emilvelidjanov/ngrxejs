import { createAction, props } from '@ngrx/store';
import { PropEntity } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { File, fileDomainStateConfig } from './file.state';

export const fileActions = {
  ...fileDomainStateConfig.getActions(),
  deleted: createAction(fileDomainStateConfig.getEffectActionType('Deleted'), props<PropEntity<File>>()),
};
