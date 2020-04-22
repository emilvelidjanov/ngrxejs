import { Projects, projectStoreConfig } from './project.state';
import { Action, createReducer, on } from '@ngrx/store';
import { projectActions } from './project.action';


const projectsInitialState = projectStoreConfig.getInitialState();
const projectAdapter = projectStoreConfig.getAdapter();

const reducer = createReducer(
  projectsInitialState,
  on(projectActions.addOne, (state: Projects, {entity}) => {
    return projectAdapter.addOne(entity, state);
  }),
);

export function projectsReducer(state: Projects | undefined, action: Action) {
  return reducer(state, action);
}