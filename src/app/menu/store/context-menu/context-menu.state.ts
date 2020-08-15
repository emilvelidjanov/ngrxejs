import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';
import { Prop } from 'src/app/core/ngrx/entity/entity-domain-state/props';

export interface ContextMenus extends EntityDomainState<ContextMenu> {}

export interface ContextMenu extends Entity {
  menuItemIds: Id[];
  isOpened: boolean;
  x: number;
  y: number;
  contextProps: Prop;
}

export const entityName = 'ContextMenu';

const initialState: ContextMenus = {
  ids: [],
  entities: {},
};

export const contextMenuDomainStateConfig: EntityDomainStateConfigurer<
  ContextMenu,
  ContextMenus
> = new EntityDomainStateConfigurer(entityName, initialState);
