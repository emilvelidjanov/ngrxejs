import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface Directories extends EntityDomainState<Directory> {}

export interface Directory extends Entity {
  path: string;
  name: string;
  fileIds: Id[];
  directoryIds: Id[];
  isLoaded: boolean;
}

export const entityName = 'Directory';

const initialState: Directories = {
  ids: [],
  entities: {},
};

export const directoryDomainStateConfig: EntityDomainStateConfigurer<
  Directory,
  Directories
> = new EntityDomainStateConfigurer(entityName, initialState);
