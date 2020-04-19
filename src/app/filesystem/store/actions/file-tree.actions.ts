import { FileTree } from '../state/file-tree.state';
import { createAction, props } from '@ngrx/store';


export const setFileTree = createAction(
  '[FileTree] Set FileTree',
  props<FileTree>()
)