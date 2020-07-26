import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { directoryItemsReducer } from './directory-item/directory-item.reducer';
import { DirectoryItems } from './directory-item/directory-item.state';
import { directoriesReducer } from './directory/directory.reducer';
import { Directories } from './directory/directory.state';
import { fileItemsReducer } from './file-item/file-item.reducer';
import { FileItems } from './file-item/file-item.state';
import { filesReducer } from './file/file.reducer';
import { Files } from './file/file.state';
import { projectTreesReducer } from './project-tree/project-tree.reducer';
import { ProjectTrees } from './project-tree/project-tree.state';
import { projectsReducer } from './project/project.reducer';
import { Projects } from './project/project.state';

export const filesystemFeatureKey = 'filesystem';

export interface FilesystemState {
  projects: Projects;
  projectTrees: ProjectTrees;
  files: Files;
  fileItems: FileItems;
  directories: Directories;
  directoryItems: DirectoryItems;
}

export const reducers: ActionReducerMap<FilesystemState> = {
  projects: projectsReducer,
  projectTrees: projectTreesReducer,
  files: filesReducer,
  fileItems: fileItemsReducer,
  directories: directoriesReducer,
  directoryItems: directoryItemsReducer,
};

export const metaReducers: MetaReducer<FilesystemState>[] = !environment.production ? [] : [];

export const selectFilesystemFeature = createFeatureSelector<FilesystemState>(filesystemFeatureKey);
export const selectProjects = createSelector(selectFilesystemFeature, (state) => state.projects);
export const selectProjectTrees = createSelector(selectFilesystemFeature, (state) => state.projectTrees);
export const selectFiles = createSelector(selectFilesystemFeature, (state) => state.files);
export const selectFileItems = createSelector(selectFilesystemFeature, (state) => state.fileItems);
export const selectDirectories = createSelector(selectFilesystemFeature, (state) => state.directories);
export const selectDirectoryItems = createSelector(selectFilesystemFeature, (state) => state.directoryItems);
