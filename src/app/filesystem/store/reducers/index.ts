import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { FileTree } from '../state/file-tree.state';
import { fileTreeReducer } from './file-tree.reducer';
import { Project } from '../state/project.state';
import { projectReducer } from './project.reducer';
import { Files } from '../state/file.state';
import { FileItems } from '../state/file-item.state';
import { filesReducer } from './file.reducer';
import { fileItemsReducer } from './file-item.reducer';


export const filesystemFeatureKey = 'filesystem';

export interface State {
  project: Project,
  files: Files,
  fileTree: FileTree,
  fileItems: FileItems,
}

export const reducers: ActionReducerMap<State> = {
  project: projectReducer,
  files: filesReducer,
  fileTree: fileTreeReducer,
  fileItems: fileItemsReducer,
};
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectProject = (state: State) => state.project;
export const selectFiles = (state: State) => state.files;
export const selectFileTree = (state: State) => state.fileTree;
export const selectFileItems = (state: State) => state.fileItems;