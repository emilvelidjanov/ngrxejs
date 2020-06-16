import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface MenuItems extends EntityDomainState<MenuItem> {}

export interface MenuItem extends Entity {
  label: string;
  clickAction?: string;
  menuItemIds: Id[];
}

export const entityName = 'MenuItem';

const initialState: MenuItems = {
  ids: [],
  entities: {},
};

export const menuItemDomainStateConfig: EntityDomainStateConfigurer<
  MenuItem,
  MenuItems
> = new EntityDomainStateConfigurer(entityName, initialState);
