import { EntityState } from '@ngrx/entity';
import { Entity, Id } from 'src/app/core/ngrx/entity-configurer/entity';
import { EntityStateConfigurer } from 'src/app/core/ngrx/entity-configurer/entity-state-configurer';

export interface MenuItems extends EntityState<MenuItem> {}

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

export const menuItemEntityStateConfig: EntityStateConfigurer<MenuItem, MenuItems> = new EntityStateConfigurer(
  entityName,
  initialState,
);
