import { projectsInitialState, Projects } from '../state/project.state';
import { Action, createReducer } from '@ngrx/store';


const reducer = createReducer(
  projectsInitialState,
);

export function projectsReducer(state: Projects | undefined, action: Action) {
  return reducer(state, action);
}