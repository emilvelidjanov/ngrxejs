import { filesInitialState, Files, fileAdapter } from '../state/file.state';
import { createReducer, Action } from '@ngrx/store';


const reducer = createReducer(
  filesInitialState,
);

export function filesReducer(state: Files | undefined, action: Action) {
  return reducer(state, action);
}

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = fileAdapter.getSelectors();

export const selectAllFiles = selectAll;
export const selectFileEntities = selectEntities;
export const selectFileIds = selectIds;
export const selectFileTotal = selectTotal;

export const selectSelectedFileIds = (state: Files) => state.selectedFileIds;