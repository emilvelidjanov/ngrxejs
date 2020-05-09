import { EntityState } from '@ngrx/entity';
import { Entity } from 'src/app/core/ngrx/entity';
import { StoreConfigurer } from 'src/app/core/ngrx/store-configurer';

export interface MenuItems extends EntityState<MenuItem> {
}

export interface MenuItem extends Entity {
  label: string,
  menuItemIds: number[],
}

export const entityName: string = "MenuItem";

const initialState: MenuItems = {
  ids: [],
  entities: {},
}

export const menuItemStoreConfig: StoreConfigurer<MenuItem, MenuItems> = new StoreConfigurer(
  entityName,
  initialState,
);