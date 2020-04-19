import { filesInitialState, Files } from '../state/file.state';
import { createReducer, Action } from '@ngrx/store';


const reducer = createReducer(
  filesInitialState,
);

export function filesReducer(state: Files | undefined, action: Action) {
  return reducer(state, action);
}
