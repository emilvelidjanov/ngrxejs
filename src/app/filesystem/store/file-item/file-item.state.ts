import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface FileItems extends EntityDomainState<FileItem> {}

export interface FileItem extends Entity {
  fileId: Id;
  projectTreeId: Id;
}

export const entityName = 'FileItem';

const initialState: FileItems = {
  ids: [],
  entities: {},
};

export const fileItemDomainStateConfig: EntityDomainStateConfigurer<FileItem, FileItems> = new EntityDomainStateConfigurer(entityName, initialState);
