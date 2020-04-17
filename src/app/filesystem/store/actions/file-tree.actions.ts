import { FileTreeState } from '../state/file-tree.state';
import { createAction, props } from '@ngrx/store';
import { FileItemState } from '../state/file-item.state';


export const setFileTree = createAction(
  '[FileTree] Set FileTree',
  props<FileTreeState>()
)

export const loadProject = createAction(
  '[FileTree] Load Project',
  props<{
    loadedDirectory: string,
    files: FileItemState[]
  }>()
)