import { EntityState } from '@ngrx/entity';
import { Entity, Id } from 'src/app/core/ngrx/entity-configurer/entity';
import { defaultInitialEntityAppState, EntityAppState } from 'src/app/core/ngrx/entity-configurer/entity-app-state';
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
  ...defaultInitialEntityAppState,
  ids: [],
  entities: {},
  openProjectId: null,
  openedIds: [],
};

export const projectEntityStateConfig: EntityStateConfigurer<Project, Projects> = new EntityStateConfigurer(
  entityName,
  initialState,
);
