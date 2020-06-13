import { EntityState } from '@ngrx/entity';
import { Entity, Id } from 'src/app/core/ngrx/entity';
import { defaultInitialEntityAppState, EntityAppState } from 'src/app/core/ngrx/entity-app-state';
import { StoreConfigurer } from 'src/app/core/ngrx/store-configurer';

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
  ...defaultInitialEntityAppState,
  ids: [],
  entities: {},
  openProjectId: null,
};

export const projectStoreConfig: StoreConfigurer<Project, Projects> = new StoreConfigurer(entityName, initialState);
