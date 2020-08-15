import { createAction, props } from '@ngrx/store';
import { GenericProp, PropCoordinates, PropEntity } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { ContextMenu, contextMenuDomainStateConfig } from './context-menu.state';

export const contextMenuActions = {
  ...contextMenuDomainStateConfig.getActions(),
  close: createAction(contextMenuDomainStateConfig.getEffectActionType('Close'), props<PropEntity<ContextMenu>>()),
  open: createAction(
    contextMenuDomainStateConfig.getEffectActionType('Open'),
    props<PropEntity<ContextMenu> & PropCoordinates & GenericProp>(),
  ),
};
