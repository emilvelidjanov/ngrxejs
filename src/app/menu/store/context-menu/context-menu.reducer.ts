import { Action, createReducer } from '@ngrx/store';

import { contextMenuDomainStateConfig, ContextMenus } from './context-menu.state';

const reducer = createReducer(contextMenuDomainStateConfig.getInitialState(), ...contextMenuDomainStateConfig.getReducerFunctions());

export function contextMenusReducer(state: ContextMenus | undefined, action: Action) {
  return reducer(state, action);
}
