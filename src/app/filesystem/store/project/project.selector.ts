import { projectStoreConfig, Projects, Project } from './project.state';
import { selectProjects } from '..';
import { createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Id } from 'src/app/core/ngrx/entity';
import { File } from "../file/file.state";
import { fileSelectors } from '../file/file.selector';


const initialState = projectStoreConfig.getInitialState();

const defSelectors = {...projectStoreConfig.getSelectors(selectProjects)};
const selectOpenProjectId = createSelector(selectProjects, 
  (projects: Projects) => projects.openProjectId,
);
const selectOpenProject = createSelector(selectOpenProjectId, 
  defSelectors.selectEntities, 
  (projectId: Id, projects: Dictionary<Project>) => 
    projectId !== initialState.openProjectId ? projects[projectId] : null,
);
const selectOpenProjectFileIds = createSelector(selectOpenProject,
  (project: Project) => project ? project.fileIds : null,
)
const selectOpenProjectFiles = createSelector(selectOpenProjectFileIds, 
  fileSelectors.selectEntities, 
  (ids: Id[], files: Dictionary<File>) => ids ? ids.map((id: Id) => files[id]) : null,
);

export const projectSelectors = {
  ...defSelectors,
  selectOpenProjectId: selectOpenProjectId,
  selectOpenProject: selectOpenProject,
  selectOpenProjectFileIds: selectOpenProjectFileIds,
  selectOpenProjectFiles: selectOpenProjectFiles,
};