import { EntityState } from '@ngrx/entity';
import { Entity } from 'src/app/core/ngrx/entity';
import { StoreConfigurer } from 'src/app/core/ngrx/store-configurer';


export interface Menus extends EntityState<Menu> {
}

export interface Menu extends Entity {
  title: string,
  image: string,
  menuItemIds: []
}

export const entityName: string = "Menu";

const initialState: Menus = {
  ids: [],
  entities: {},
}

export const menuStoreConfig: StoreConfigurer<Menu, Menus> = new StoreConfigurer(
  entityName,
  initialState,
);