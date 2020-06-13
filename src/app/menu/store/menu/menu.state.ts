import { EntityState } from '@ngrx/entity';
import { Entity, Id } from 'src/app/core/ngrx/entity-configurer/entity';
import { EntityStateConfigurer } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

export interface Menus extends EntityState<Menu> {}

export interface Menu extends Entity {
  title: string;
  image: string;
  menuItemIds: Id[];
}

export const entityName = 'Menu';

const initialState: Menus = {
  ids: [],
  entities: {},
};

export const menuEntityStateConfig: EntityStateConfigurer<Menu, Menus> = new EntityStateConfigurer(
  entityName,
  initialState,
);
