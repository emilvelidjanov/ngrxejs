import { createAction, props } from '@ngrx/store';
import { PropEntity } from 'src/app/core/ngrx/entity/entity-domain-state/props';

import { TabItem, tabItemDomainStateConfig } from './tab-item.state';

export const tabItemActions = {
  ...tabItemDomainStateConfig.getActions(),
  onClick: createAction(tabItemDomainStateConfig.getEffectActionType('On Click'), props<PropEntity<TabItem>>()),
  close: createAction(tabItemDomainStateConfig.getEffectActionType('Close'), props<PropEntity<TabItem>>()),
};
