import { ActionDescriptor } from 'src/app/core/ngrx/action-descriptor';
import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface MenuItems extends EntityDomainState<MenuItem> {}

export type OpenType = 'click' | 'hover';

export interface MenuItem extends Entity {
  label: string;
  clickAction: ActionDescriptor; // TODO: own entity?
  menuItemIds: Id[];
  openType: OpenType;
  isOpened: boolean;
  preSymbol: string;
  postSymbol: string;
  isDisabled: boolean;
  isContextAware: boolean;
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
