import { Dictionary } from '@ngrx/entity';
import { ActionCreator, createAction, createSelector, On, on, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { Entity, Id } from './entity';
import { EntityAppState } from './entity-app-state';
import { DefaultSelectors, PropId, PropIds } from './entity-state-configurer';

export class EntityAppStateConfigurer<EntityType extends Entity, AppStateType extends EntityAppState> {
  private entityName: string;
  private initialState: AppStateType;
  private actions: DefaultAppActions;
  private reducers: On<AppStateType>[];

  constructor(entityName: string, initialState: AppStateType) {
    this.entityName = entityName;
    this.initialState = initialState;
    this.actions = this.initActions();
    this.reducers = this.initReducerFunctions();
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
      defaultAppSelectors.selectFirstOpenedId = createSelector(
        defaultAppSelectors.selectOpenedIds,
        (ids: Id[]) => ids[0],
      );
      if (entityStateSelectors) {
        defaultAppSelectors.selectOpenedEntities = createSelector(
          defaultAppSelectors.selectOpenedIds,
          entityStateSelectors.selectEntities,
          (ids: Id[], entities: Dictionary<EntityType>) => ids.map((id: Id) => entities[id]),
        );
        defaultAppSelectors.selectFirstOpenedEntity = createSelector(
          defaultAppSelectors.selectOpenedEntities,
          (entities: EntityType[]) => entities[0],
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

  public getActions(): DefaultAppActions {
    return this.actions;
  }

  public getActionType(type: string) {
    const actionType = `[${this.entityName}] ${type}`;
    return actionType;
  }

  public getReducerFunctions(): On<AppStateType>[] {
    return this.reducers;
  }

  private initActions(): DefaultAppActions {
    const defaultAppActions: DefaultAppActions = {};
    if (this.initialState.loadedIds !== undefined) {
      defaultAppActions.addLoadedId = createAction(this.getActionType('Add Loaded Id'), props<PropId>());
    }
    if (this.initialState.openedIds !== undefined) {
      defaultAppActions.addOpenedId = createAction(this.getActionType('Add Opened Id'), props<PropId>());
      defaultAppActions.removeOpenedId = createAction(this.getActionType('Remove Opened Id'), props<PropId>());
      defaultAppActions.setOpenedIds = createAction(this.getActionType('Set Opened Ids'), props<PropIds>());
    }
    if (this.initialState.focusedId !== undefined) {
      defaultAppActions.setFocusedId = createAction(this.getActionType('Set Focused Id'), props<PropId>());
    }
    return defaultAppActions;
  }

  private initReducerFunctions(): On<AppStateType>[] {
    const reducerFunctions: On<AppStateType>[] = [];
    if (this.initialState.loadedIds !== undefined) {
      reducerFunctions.push(
        on(this.actions.addLoadedId, (state: AppStateType, props: PropId) => {
          return { ...state, loadedIds: [...state.loadedIds, props.id] };
        }),
      );
    }
    if (this.initialState.openedIds !== undefined) {
      reducerFunctions.push(
        on(this.actions.addOpenedId, (state: AppStateType, props: PropId) => {
          return { ...state, openedIds: [...state.openedIds, props.id] };
        }),
        on(this.actions.removeOpenedId, (state: AppStateType, props: PropId) => {
          return { ...state, openedIds: state.openedIds.filter((id: Id) => id !== props.id) };
        }),
        on(this.actions.setOpenedIds, (state: AppStateType, props: PropIds) => {
          return { ...state, openedIds: props.ids };
        }),
      );
    }
    if (this.initialState.focusedId !== undefined) {
      reducerFunctions.push(
        on(this.actions.setFocusedId, (state: AppStateType, props: PropId) => {
          return { ...state, focusedId: props.id };
        }),
      );
    }
    return reducerFunctions;
  }
}

export interface DefaultAppSelectors<T extends Entity> {
  selectLoadedIds?: (state: object) => Id[];
  selectLoadedEntities?: (state: object) => T[];
  selectIsLoadedId?: (state: object, props: PropId) => boolean;
  selectOpenedIds?: (state: object) => Id[];
  selectFirstOpenedId?: (state: object) => Id;
  selectOpenedEntities?: (state: object) => T[];
  selectFirstOpenedEntity?: (state: object) => T;
  selectIsOpenedId?: (state: object, props: PropId) => boolean;
  selectFocusedId?: (state: object) => Id;
  selectFocusedEntity?: (state: object) => T;
  selectIsFocusedId?: (state: object, props: PropId) => boolean;
}

export interface DefaultAppActions {
  addLoadedId?: ActionCreator<string, (props: PropId) => PropId & TypedAction<string>>;
  addOpenedId?: ActionCreator<string, (props: PropId) => PropId & TypedAction<string>>;
  removeOpenedId?: ActionCreator<string, (props: PropId) => PropId & TypedAction<string>>;
  setOpenedIds?: ActionCreator<string, (props: PropIds) => PropIds & TypedAction<string>>;
  setFocusedId?: ActionCreator<string, (props: PropId) => PropId & TypedAction<string>>;
}
