import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { Projects } from '../state/project.state';
import { projectsReducer } from './project.reducer';
import { Files } from '../state/file.state';
import { filesReducer } from './file.reducer';


export const filesystemFeatureKey = 'filesystem';

export interface State {
  projects: Projects,
  files: Files,
}

export const reducers: ActionReducerMap<State> = {
  projects: projectsReducer,
  files: filesReducer,
};
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectProjects = (state: State) => state.projects;
export const selectFiles = (state: State) => state.files;