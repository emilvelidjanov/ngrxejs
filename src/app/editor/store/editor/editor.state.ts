import { Entity, Id } from 'src/app/core/ngrx/entity/entity';
import { EntityDomainState } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state';
import { EntityDomainStateConfigurer } from 'src/app/core/ngrx/entity/entity-domain-state/entity-domain-state-configurer';

export interface Editors extends EntityDomainState<Editor> {}

export type RenderMode = 'html' | 'plain';

export interface Editor extends Entity {
  focusedFileId: Id;
  openedFileIds: Id[];
  isFocused: boolean;
  tabBarId: string;
  renderMode: RenderMode;
}

export const entityName = 'Editor';

const initialState: Editors = {
  ids: [],
  entities: {},
};

export const editorDomainStateConfig: EntityDomainStateConfigurer<Editor, Editors> = new EntityDomainStateConfigurer(entityName, initialState);
