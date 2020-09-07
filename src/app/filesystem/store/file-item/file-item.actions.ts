import { createAction, props } from '@ngrx/store';
import { PropEntity, PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { FileItem, fileItemDomainStateConfig } from './file-item.state';

export const fileItemActions = {
  ...fileItemDomainStateConfig.getActions(),
  onClick: createAction(fileItemDomainStateConfig.getEffectActionType('On Click'), props<PropEntity<FileItem>>()),
  delete: createAction(fileItemDomainStateConfig.getEffectActionType('Delete'), props<PropId>()),
};
