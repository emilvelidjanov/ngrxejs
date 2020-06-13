import { EntityState } from '@ngrx/entity';
import { Entity, Id } from 'src/app/core/ngrx/entity-configurer/entity';
import { EntityAppState } from 'src/app/core/ngrx/entity-configurer/entity-app-state';
import { EntityAppStateConfigurer } from 'src/app/core/ngrx/entity-configurer/entity-app-state-configurer';
import { EntityStateConfigurer } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

export interface Projects extends EntityState<Project>, EntityAppState {
  openProjectId: Id;
}

export interface Project extends Entity {
  name: string;
  directory: string;
  fileIds: Id[];
  directoryIds: Id[];
}

export const entityName = 'Project';

const initialState: Projects = {
  ids: [],
  entities: {},
  openProjectId: null,

  // app state
  openedIds: [],
};

export const projectEntityStateConfig: EntityStateConfigurer<Project, Projects> = new EntityStateConfigurer(
  entityName,
  initialState,
);
export const projectEntityAppStateConfig: EntityAppStateConfigurer<Project, Projects> = new EntityAppStateConfigurer(
  entityName,
  initialState,
);
