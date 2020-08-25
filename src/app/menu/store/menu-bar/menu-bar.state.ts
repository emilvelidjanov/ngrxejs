import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface MenuBars extends EntityDomainState<MenuBar> {}

export interface MenuBar extends Entity {
  title: string;
  image: string;
  menuItemIds: Id[];
}

export const entityName = 'MenuBar';

const initialState: MenuBars = {
  ids: [],
  entities: {},
};

export const menuBarDomainStateConfig: EntityDomainStateConfigurer<MenuBar, MenuBars> = new EntityDomainStateConfigurer(entityName, initialState);
