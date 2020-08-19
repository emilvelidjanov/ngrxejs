import { createAction, props } from '@ngrx/store';
import { CreateNewInputTypeProp, PropEntity, PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { directoryDomainStateConfig, DirectoryItem } from './directory-item.state';

export const directoryItemActions = {
  ...directoryDomainStateConfig.getActions(),
  open: createAction(directoryDomainStateConfig.getEffectActionType('Open'), props<PropEntity<DirectoryItem>>()),
  showCreateNewInput: createAction(directoryDomainStateConfig.getEffectActionType('Show Create New Input'), props<PropId & CreateNewInputTypeProp>()),
  createNewDirectory: createAction(
    directoryDomainStateConfig.getEffectActionType('Create New Directory'),
    props<PropEntity<DirectoryItem> & { name: string }>(),
  ),
  createNewFile: createAction(
    directoryDomainStateConfig.getEffectActionType('Create New File'),
    props<PropEntity<DirectoryItem> & { name: string }>(),
  ),
};
