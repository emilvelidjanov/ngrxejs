import { createAction, props } from '@ngrx/store';
import { Project } from '../state/project.state';


export const setProject = createAction(
  '[Project] Set Project',
  props<Project>()
)