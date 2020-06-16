import { Action, createReducer } from '@ngrx/store';

import { menuItemDomainStateConfig, MenuItems } from './menu-item.state';

const reducer = createReducer(
  menuItemDomainStateConfig.getInitialState(),
  ...menuItemDomainStateConfig.getReducerFunctions(),
);

export function menuItemsReducer(state: MenuItems | undefined, action: Action) {
  return reducer(state, action);
}
