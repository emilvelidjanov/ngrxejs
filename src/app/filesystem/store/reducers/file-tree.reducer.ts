import { setFileTree } from '../actions/file-tree.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { fileTreeInitialState, FileTree } from '../state/file-tree.state';


const reducer = createReducer(
  fileTreeInitialState,
  on(setFileTree, (state: FileTree, fileTree: FileTree) => {
    return {...state, fileTree};
  })
);

export function fileTreeReducer(state: FileTree | undefined, action: Action) {
  return reducer(state, action);
}
