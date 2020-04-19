import { Project, projectInitialState } from '../state/project.state';
import { Action, createReducer, on } from '@ngrx/store';
import { setProject } from '../actions/project.actions';


const reducer = createReducer(
  projectInitialState,
  on(setProject, (state: Project, action: Project) => {
    return {...state, ...action};
  })
);

export function projectReducer(state: Project | undefined, action: Action) {
  return reducer(state, action);
}
