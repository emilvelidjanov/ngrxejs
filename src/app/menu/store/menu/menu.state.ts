import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityAppState } from 'src/app/core/ngrx/entity/entity-app-state/entity-app-state';
import { EntityAppStateConfigurer } from 'src/app/core/ngrx/entity/entity-app-state/entity-app-state-configurer';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface Menus extends EntityDomainState<Menu>, EntityAppState {}

export interface Menu extends Entity {
  title?: string;
  image?: string;
  menuItemIds?: Id[];
  x?: number;
  y?: number;
}

export const entityName = 'Menu';

const initialState: Menus = {
  ids: [],
  entities: {},
  openedIds: [],
};

export const menuDomainStateConfig: EntityDomainStateConfigurer<Menu, Menus> = new EntityDomainStateConfigurer(
  entityName,
  initialState,
);
export const menuAppStateConfig: EntityAppStateConfigurer<Menu, Menus> = new EntityAppStateConfigurer(
  entityName,
  initialState,
);
