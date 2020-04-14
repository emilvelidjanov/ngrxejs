import { setFileTree } from '../actions/filesystem.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { initialState, FileTreeState } from '../state/file-tree.state';


const fileTreeReducer = createReducer(
  initialState,
  on(setFileTree, (state: FileTreeState, fileTree: FileTreeState) => {
    return {...fileTree};
  })
);

export function reducer(state: FileTreeState | undefined, action: Action) {
  return fileTreeReducer(state, action);
}
