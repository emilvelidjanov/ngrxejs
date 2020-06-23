import { createAction, props } from '@ngrx/store';
import { PropEntity, PropHtmlNodeName } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { MenuItem, menuItemAppStateConfig, menuItemDomainStateConfig } from './menu-item.state';

export const menuItemActions = {
  ...menuItemDomainStateConfig.getActions(),
  ...menuItemAppStateConfig.getActions(),
  clickMenuItem: createAction(
    menuItemAppStateConfig.getEffectActionType('Click Menu Item'),
    props<PropEntity<MenuItem>>(),
  ),
  offClickMenuItem: createAction(
    menuItemAppStateConfig.getEffectActionType('Off Click Menu Item'),
    props<PropHtmlNodeName>(),
  ),
};
