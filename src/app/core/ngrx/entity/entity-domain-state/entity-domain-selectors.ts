import { EntitySelectors } from '@ngrx/entity/src/models';

import { Entity } from '../entity';

import { PropId, PropIds, PropPredicate } from './props';

export interface EntityDomainSelectors<T extends Entity> extends EntitySelectors<T, object> {
  selectEntityById: (state: object, props: PropId) => T;
  selectEntitiesByIds: (state: object, props: PropIds) => T[];
  selectEntitiesByPredicate: (state: object, props: PropPredicate<T>) => T[];
}
