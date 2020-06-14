import { Entity, Id } from '../entity';
import { PropId } from '../entity-domain-state/props';

export interface EntityAppSelectors<T extends Entity> {
  selectLoadedIds?: (state: object) => Id[];
  selectLoadedEntities?: (state: object) => T[];
  selectIsLoadedId?: (state: object, props: PropId) => boolean;
  selectOpenedIds?: (state: object) => Id[];
  selectFirstOpenedId?: (state: object) => Id;
  selectOpenedEntities?: (state: object) => T[];
  selectFirstOpenedEntity?: (state: object) => T;
  selectIsOpenedId?: (state: object, props: PropId) => boolean;
  selectFocusedId?: (state: object) => Id;
  selectFocusedEntity?: (state: object) => T;
  selectIsFocusedId?: (state: object, props: PropId) => boolean;
}
