import { Entity, Id } from '../entity';
import { PropId } from '../entity-domain-state/props';

export interface EntityAppSelectors<EntityType extends Entity> {
  selectLoadedIds?: (state: object) => Id[];
  selectLoadedEntities?: (state: object) => EntityType[];
  selectIsLoadedId?: (state: object, props: PropId) => boolean;
  selectOpenedIds?: (state: object) => Id[];
  selectFirstOpenedId?: (state: object) => Id;
  selectOpenedEntities?: (state: object) => EntityType[];
  selectFirstOpenedEntity?: (state: object) => EntityType;
  selectIsOpenedId?: (state: object, props: PropId) => boolean;
  selectFocusedId?: (state: object) => Id;
  selectFocusedEntity?: (state: object) => EntityType;
  selectIsFocusedId?: (state: object, props: PropId) => boolean;
}
