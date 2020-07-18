import { createAction, props } from '@ngrx/store';
import { PropEntity } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { directoryDomainStateConfig, DirectoryItem } from './directory-item.state';

export const directoryItemActions = {
  ...directoryDomainStateConfig.getActions(),
  open: createAction(directoryDomainStateConfig.getEffectActionType('Open'), props<PropEntity<DirectoryItem>>()),
};
