import { Action, createReducer } from '@ngrx/store';

import { Directories, directoryEntityAppStateConfig, directoryEntityStateConfig } from './directory.state';

const reducer = createReducer(
  directoryEntityStateConfig.getInitialState(),
  ...directoryEntityStateConfig.getReducerFunctions(),
  ...directoryEntityAppStateConfig.getReducerFunctions(),
);

export function directoriesReducer(state: Directories | undefined, action: Action) {
  return reducer(state, action);
}
