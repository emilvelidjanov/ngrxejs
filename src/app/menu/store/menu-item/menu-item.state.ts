import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityAppState } from 'src/app/core/ngrx/entity/entity-app-state/entity-app-state';
import { EntityAppStateConfigurer } from 'src/app/core/ngrx/entity/entity-app-state/entity-app-state-configurer';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface MenuItems extends EntityDomainState<MenuItem>, EntityAppState {}

export interface MenuItem extends Entity {
  label: string;
  clickAction?: string;
  menuItemIds?: Id[];
}

export const entityName = 'MenuItem';

const initialState: MenuItems = {
  ids: [],
  entities: {},
  openedIds: [],
};

export const menuItemDomainStateConfig: EntityDomainStateConfigurer<
  MenuItem,
  MenuItems
> = new EntityDomainStateConfigurer(entityName, initialState);
export const menuItemAppStateConfig: EntityAppStateConfigurer<MenuItem, MenuItems> = new EntityAppStateConfigurer(
  entityName,
  initialState,
);
