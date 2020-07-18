import { Action, createReducer } from '@ngrx/store';

import { fileDomainStateConfig, Files } from './file.state';

const reducer = createReducer(fileDomainStateConfig.getInitialState(), ...fileDomainStateConfig.getReducerFunctions());

export function filesReducer(state: Files | undefined, action: Action) {
  return reducer(state, action);
}
