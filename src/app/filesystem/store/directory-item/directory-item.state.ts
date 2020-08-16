import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface DirectoryItems extends EntityDomainState<DirectoryItem> {}

export type CreateNewInputType = 'none' | 'file' | 'directory';

export interface DirectoryItem extends Entity {
  directoryId: Id;
  directoryItemIds: Id[];
  fileItemIds: Id[];
  projectTreeId: Id; // TODO: rename app state entities to "view"
  isOpened: boolean;
  createNewInputType: CreateNewInputType;
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
