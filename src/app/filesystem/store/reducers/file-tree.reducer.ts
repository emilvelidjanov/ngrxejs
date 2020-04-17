import { setFileTree } from '../actions/file-tree.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { initialState, FileTreeState } from '../state/file-tree.state';
import { loadProject } from '../actions/file-tree.actions';


const fileTreeReducer = createReducer(
  initialState,
  on(setFileTree, (state: FileTreeState, fileTree: FileTreeState) => {
    return {...state, fileTree};
  }),
  on(loadProject, (state: FileTreeState, action) => {
    return {...state, ...action};
  })
);

export function reducer(state: FileTreeState | undefined, action: Action) {
  return fileTreeReducer(state, action);
}
