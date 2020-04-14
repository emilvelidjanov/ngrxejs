import { FileTreeState } from '../state/file-tree.state';
import { createAction, props } from '@ngrx/store';


export const setFileTree = createAction(
  '[FileTree] Set FileTree',
  props<FileTreeState>()
)

export const setLoadedDirectory = createAction(
  '[FileTree] Set LoadedDirectory',
  props<{loadedDirectory: string}>()
)