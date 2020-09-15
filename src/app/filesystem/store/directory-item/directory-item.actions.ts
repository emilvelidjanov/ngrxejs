import { createAction, props } from '@ngrx/store';
import { CreateNewInputTypeProp, PropEntity, PropId } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { DirectoryItem, directoryItemDomainStateConfig } from './directory-item.state';

export const directoryItemActions = {
  ...directoryItemDomainStateConfig.getActions(),
  open: createAction(directoryItemDomainStateConfig.getEffectActionType('Open'), props<PropEntity<DirectoryItem>>()),
  showCreateNewInput: createAction(
    directoryItemDomainStateConfig.getEffectActionType('Show Create New Input'),
    props<PropId & CreateNewInputTypeProp>(),
  ),
  createNewDirectory: createAction(
    directoryItemDomainStateConfig.getEffectActionType('Create New Directory'),
    props<PropEntity<DirectoryItem> & { name: string }>(),
  ),
  createNewFile: createAction(
    directoryItemDomainStateConfig.getEffectActionType('Create New File'),
    props<PropEntity<DirectoryItem> & { name: string }>(),
  ),
  delete: createAction(directoryItemDomainStateConfig.getEffectActionType('Delete'), props<PropId>()),
};
