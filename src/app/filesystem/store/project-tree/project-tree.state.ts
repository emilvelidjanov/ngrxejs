import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface ProjectTrees extends EntityDomainState<ProjectTree> {}

export interface ProjectTree extends Entity {
  projectId: Id;
  fileItemIds: Id[];
  directoryItemIds: Id[];
  contextMenuId: string;
}

export const entityName = 'ProjectTree';

const initialState: ProjectTrees = {
  ids: [],
  entities: {},
};

export const projectDomainStateConfig: EntityDomainStateConfigurer<
  ProjectTree,
  ProjectTrees
> = new EntityDomainStateConfigurer(entityName, initialState);
