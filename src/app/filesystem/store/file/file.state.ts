import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityAppState } from 'src/app/core/ngrx/entity/entity-app-state/entity-app-state';
import { EntityAppStateConfigurer } from 'src/app/core/ngrx/entity/entity-app-state/entity-app-state-configurer';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface Files extends EntityDomainState<File>, EntityAppState {}

export interface File extends Entity {
  path: string;
  name: string;
  extension: string;
  content: string;
}

export const entityName = 'File';

const initialState: Files = {
  ids: [],
  entities: {},
  loadedIds: [],
};

export const fileDomainStateConfig: EntityDomainStateConfigurer<File, Files> = new EntityDomainStateConfigurer(
  entityName,
  initialState,
);
export const fileAppStateConfig: EntityAppStateConfigurer<File, Files> = new EntityAppStateConfigurer(
  entityName,
  initialState,
);
