import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityAppState } from 'src/app/core/ngrx/entity/entity-app-state/entity-app-state';
import { EntityAppStateConfigurer } from 'src/app/core/ngrx/entity/entity-app-state/entity-app-state-configurer';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface Directories extends EntityDomainState<Directory>, EntityAppState {}

export interface Directory extends Entity {
  path: string;
  name: string;
  fileIds: Id[];
  directoryIds: Id[];
}

export const entityName = 'Directory';

const initialState: Directories = {
  ids: [],
  entities: {},
  loadedIds: [],
  openedIds: [],
};

export const directoryDomainStateConfig: EntityDomainStateConfigurer<
  Directory,
  Directories
> = new EntityDomainStateConfigurer(entityName, initialState);
export const directoryAppStateConfig: EntityAppStateConfigurer<Directory, Directories> = new EntityAppStateConfigurer(
  entityName,
  initialState,
);
