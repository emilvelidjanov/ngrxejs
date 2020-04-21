import { createAction, props } from '@ngrx/store';
import { Project } from '../state/project.state';


export const addProject = createAction('[Project] Add Project', props<{project: Project}>());
