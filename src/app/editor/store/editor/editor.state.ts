import { Entity } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';
import { entityName } from 'src/app/filesystem/store/file/file.state';

export interface Editors extends EntityDomainState<Editor> {}

export interface Editor extends Entity {}

const initialState: Editors = {
  ids: [],
  entities: {},
};

export const editorDomainStateConfig: EntityDomainStateConfigurer<Editor, Editors> = new EntityDomainStateConfigurer(
  entityName,
  initialState,
);
