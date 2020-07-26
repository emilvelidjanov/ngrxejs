import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface DirectoryItems extends EntityDomainState<DirectoryItem> {}

export interface DirectoryItem extends Entity {
  directoryId: Id;
  directoryItemIds: Id[];
  fileItemIds: Id[];
  isOpened: boolean;
  contextMenuId: Id;
}

export const entityName = 'DirectoryItem';

const initialState: DirectoryItems = {
  ids: [],
  entities: {},
};

export const directoryDomainStateConfig: EntityDomainStateConfigurer<
  DirectoryItem,
  DirectoryItems
> = new EntityDomainStateConfigurer(entityName, initialState);