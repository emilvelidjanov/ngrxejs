import { EntityState } from '@ngrx/entity';
import { Entity, EntityAppState, Id } from 'src/app/core/ngrx/entity';
import { StoreConfigurer } from 'src/app/core/ngrx/store-configurer';

export interface MenuItems extends EntityState<MenuItem>, EntityAppState {}

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

export const menuItemStoreConfig: StoreConfigurer<MenuItem, MenuItems> = new StoreConfigurer(entityName, initialState);
