import { fileItemsInitialState, FileItems } from '../state/file-item.state';
import { createReducer, Action } from '@ngrx/store';


const reducer = createReducer(
  fileItemsInitialState,
);

export function fileItemsReducer(state: FileItems | undefined, action: Action) {
  return reducer(state, action);
}