import { createAction, props } from '@ngrx/store';
import { PropEntity } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { MenuItem, menuItemDomainStateConfig } from './menu-item.state';

export const menuItemActions = {
  ...menuItemDomainStateConfig.getActions(),
  onClick: createAction(menuItemDomainStateConfig.getEffectActionType('On Click'), props<PropEntity<MenuItem>>()),
  offClickNestedMenuItems: createAction(menuItemDomainStateConfig.getEffectActionType('Off Click Nested Menu Items')),
};
