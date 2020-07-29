import { Entity } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface TabItems extends EntityDomainState<TabItem> {}

export interface TabItem extends Entity {}

export const entityName = 'TabItem';

const initialState: TabItems = {
  ids: [],
  entities: {},
};

export const tabItemDomainStateConfig: EntityDomainStateConfigurer<TabItem, TabItems> = new EntityDomainStateConfigurer(
  entityName,
  initialState,
);
