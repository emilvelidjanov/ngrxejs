import { Entity } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface Files extends EntityDomainState<File> {}

export interface File extends Entity {
  path: string;
  name: string;
  extension: string;
  content: string;
  isLoaded: boolean;
}

export const entityName = 'File';

const initialState: Files = {
  ids: [],
  entities: {},
};

export const fileDomainStateConfig: EntityDomainStateConfigurer<File, Files> = new EntityDomainStateConfigurer(
  entityName,
  initialState,
);
