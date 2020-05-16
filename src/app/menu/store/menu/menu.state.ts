import { EntityState } from '@ngrx/entity';
import { Entity, EntityAppState, Id } from 'src/app/core/ngrx/entity';
import { StoreConfigurer } from 'src/app/core/ngrx/store-configurer';

export interface Menus extends EntityState<Menu>, EntityAppState {}

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

export const menuStoreConfig: StoreConfigurer<Menu, Menus> = new StoreConfigurer(entityName, initialState);
