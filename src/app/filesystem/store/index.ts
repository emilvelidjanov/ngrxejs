import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { directoriesReducer } from './directory/directory.reducer';
import { Directories } from './directory/directory.state';
import { filesReducer } from './file/file.reducer';
import { Files } from './file/file.state';
import { projectsReducer } from './project/project.reducer';
import { Projects } from './project/project.state';

export const filesystemFeatureKey = 'filesystem';

export interface FilesystemState {
  projects: Projects;
  files: Files;
  directories: Directories;
}

export const reducers: ActionReducerMap<FilesystemState> = {
  projects: projectsReducer,
  files: filesReducer,
  directories: directoriesReducer,
};

export const metaReducers: MetaReducer<FilesystemState>[] = !environment.production ? [] : [];

export const selectFilesystemFeature = createFeatureSelector<FilesystemState>(filesystemFeatureKey);
export const selectProjects = createSelector(selectFilesystemFeature, (state: FilesystemState) => state.projects);
export const selectFiles = createSelector(selectFilesystemFeature, (state: FilesystemState) => state.files);
export const selectDirectories = createSelector(selectFilesystemFeature, (state: FilesystemState) => state.directories);
