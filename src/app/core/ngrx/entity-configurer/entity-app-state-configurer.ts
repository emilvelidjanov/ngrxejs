import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';

import { Entity, Id } from './entity';
import { EntityAppState } from './entity-app-state';
import { DefaultSelectors, PropId } from './entity-state-configurer';

export class EntityAppStateConfigurer<EntityType extends Entity, AppStateType extends EntityAppState> {
  private initialState: AppStateType;

  constructor(initialState: AppStateType) {
    this.initialState = initialState;
  }

  public getSelectors(
    appStateSelector: (state: object) => AppStateType,
    entityStateSelectors?: DefaultSelectors<EntityType>,
  ): DefaultAppSelectors<EntityType> {
    const defaultAppSelectors: DefaultAppSelectors<EntityType> = {};
    if (this.initialState.loadedIds !== undefined) {
      defaultAppSelectors.selectLoadedIds = createSelector(
        appStateSelector,
        (appState: AppStateType) => appState.loadedIds,
      );
      if (entityStateSelectors) {
        defaultAppSelectors.selectLoadedEntities = createSelector(
          defaultAppSelectors.selectLoadedIds,
          entityStateSelectors.selectEntities,
          (ids: Id[], entities: Dictionary<EntityType>) => ids.map((id: Id) => entities[id]),
        );
      }
      defaultAppSelectors.selectIsLoadedId = createSelector(
        defaultAppSelectors.selectLoadedIds,
        (ids: Id[], props: PropId) => ids.includes(props.id),
      );
    }
    if (this.initialState.openedIds !== undefined) {
      defaultAppSelectors.selectOpenedIds = createSelector(
        appStateSelector,
        (appState: AppStateType) => appState.openedIds,
      );
      if (entityStateSelectors) {
        defaultAppSelectors.selectOpenedEntities = createSelector(
          defaultAppSelectors.selectOpenedIds,
          entityStateSelectors.selectEntities,
          (ids: Id[], entities: Dictionary<EntityType>) => ids.map((id: Id) => entities[id]),
        );
      }
      defaultAppSelectors.selectIsOpenedId = createSelector(
        defaultAppSelectors.selectOpenedIds,
        (ids: Id[], props: PropId) => ids.includes(props.id),
      );
    }
    if (this.initialState.focusedId !== undefined) {
      defaultAppSelectors.selectFocusedId = createSelector(
        appStateSelector,
        (appState: AppStateType) => appState.focusedId,
      );
      if (entityStateSelectors) {
        defaultAppSelectors.selectFocusedEntity = createSelector(
          defaultAppSelectors.selectFocusedId,
          entityStateSelectors.selectEntities,
          (id: Id, entities: Dictionary<EntityType>) => entities[id],
        );
      }
      defaultAppSelectors.selectIsFocusedId = createSelector(
        defaultAppSelectors.selectFocusedId,
        (id: Id, props: PropId) => id === props.id,
      );
    }
    return defaultAppSelectors;
  }
}

export interface DefaultAppSelectors<T extends Entity> {
  selectLoadedIds?: (state: object) => Id[];
  selectLoadedEntities?: (state: object) => T[];
  selectIsLoadedId?: (state: object, props: PropId) => boolean;
  selectOpenedIds?: (state: object) => Id[];
  selectOpenedEntities?: (state: object) => T[];
  selectIsOpenedId?: (state: object, props: PropId) => boolean;
  selectFocusedId?: (state: object) => Id;
  selectFocusedEntity?: (state: object) => T;
  selectIsFocusedId?: (state: object, props: PropId) => boolean;
}
