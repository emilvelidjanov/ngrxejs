import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface Menus extends EntityDomainState<Menu> {}

export interface Menu extends Entity {
  title?: string;
  image?: string;
  menuItemIds?: Id[];
  isOpened?: boolean;
  x?: number;
  y?: number;
}

export const entityName = 'Menu';

const initialState: Menus = {
  ids: [],
  entities: {},
};

export const menuDomainStateConfig: EntityDomainStateConfigurer<Menu, Menus> = new EntityDomainStateConfigurer(
  entityName,
  initialState,
);
