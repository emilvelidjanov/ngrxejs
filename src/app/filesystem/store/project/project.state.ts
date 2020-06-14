import { EntityState } from '@ngrx/entity';
import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityAppState } from 'src/app/core/ngrx/entity/entity-app-state/entity-app-state';
import { EntityAppStateConfigurer } from 'src/app/core/ngrx/entity/entity-app-state/entity-app-state-configurer';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface Projects extends EntityDomainState<Project>, EntityAppState {}

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
  openedIds: [],
};

export const projectDomainStateConfig: EntityDomainStateConfigurer<Project, Projects> = new EntityDomainStateConfigurer(
  entityName,
  initialState,
);
export const projectAppStateConfig: EntityAppStateConfigurer<Project, Projects> = new EntityAppStateConfigurer(
  entityName,
  initialState,
);
