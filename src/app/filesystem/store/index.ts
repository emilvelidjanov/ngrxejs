import { ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { Projects } from './project/project.state';
import { projectsReducer } from './project/project.reducer';
import { Files } from './file/file.state';
import { filesReducer } from './file/file.reducer';


export const filesystemFeatureKey = 'filesystem';

export interface FilesystemState {
  projects: Projects;
  files: Files;
}

export const reducers: ActionReducerMap<FilesystemState> = {
  projects: projectsReducer,
  files: filesReducer,
};

export const metaReducers: MetaReducer<FilesystemState>[] = !environment.production ? [] : [];

export const selectFilesystemFeature = createFeatureSelector<FilesystemState>(filesystemFeatureKey);
export const selectProjects = createSelector(selectFilesystemFeature, (state: FilesystemState) => state.projects);
export const selectFiles = createSelector(selectFilesystemFeature, (state: FilesystemState) => state.files);
