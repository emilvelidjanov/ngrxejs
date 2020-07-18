import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface Projects extends EntityDomainState<Project> {}

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
};

export const projectDomainStateConfig: EntityDomainStateConfigurer<Project, Projects> = new EntityDomainStateConfigurer(
  entityName,
  initialState,
);
