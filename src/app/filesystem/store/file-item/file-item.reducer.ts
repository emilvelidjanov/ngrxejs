import { Action, createReducer } from '@ngrx/store';

import { fileItemDomainStateConfig, FileItems } from './file-item.state';

const reducer = createReducer(
  fileItemDomainStateConfig.getInitialState(),
  ...fileItemDomainStateConfig.getReducerFunctions(),
);

export function fileItemsReducer(state: FileItems | undefined, action: Action) {
  return reducer(state, action);
}
