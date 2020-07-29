import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface TabBars extends EntityDomainState<TabBar> {}

export interface TabBar extends Entity {
  tabItemIds: Id[];
}

export const entityName = 'TabBar';

const initialState: TabBars = {
  ids: [],
  entities: {},
};

export const tabBarDomainStateConfig: EntityDomainStateConfigurer<TabBar, TabBars> = new EntityDomainStateConfigurer(
  entityName,
  initialState,
);
