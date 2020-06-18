import { Dictionary } from '@ngrx/entity';
import { createAction, createSelector, On, on, props } from '@ngrx/store';

import { Entity, Id } from '../entity';
import { EntityDomainSelectors } from '../entity-domain-state/entity-domain-selectors';
import { PropId, PropIds } from '../entity-domain-state/props';

import { EntityAppActions } from './entity-app-actions';
import { EntityAppSelectors } from './entity-app-selectors';
import { EntityAppState } from './entity-app-state';

export class EntityAppStateConfigurer<EntityType extends Entity, AppStateType extends EntityAppState> {
  private readonly entityName: string;
  private readonly initialState: AppStateType;
  private readonly actions: EntityAppActions;
  private readonly reducers: On<AppStateType>[];

  constructor(entityName: string, initialState: AppStateType) {
    this.entityName = entityName;
    this.initialState = initialState;
    this.actions = this.initActions();
    this.reducers = this.initReducerFunctions();
  }

  public getSelectors(
    appStateSelector: (state: object) => AppStateType,
    entityStateSelectors?: EntityDomainSelectors<EntityType>,
  ): EntityAppSelectors<EntityType> {
    const defaultAppSelectors: EntityAppSelectors<EntityType> = {};
    if (this.initialState.loadedIds !== undefined) {
      defaultAppSelectors.selectLoadedIds = createSelector(
        appStateSelector,
        (appState: AppStateType) => appState.loadedIds,
      );
      defaultAppSelectors.selectIsLoadedId = createSelector(
        defaultAppSelectors.selectLoadedIds,
        (ids: Id[], props: PropId) => ids.includes(props.id),
      );
      if (entityStateSelectors) {
        defaultAppSelectors.selectLoadedEntities = createSelector(
          defaultAppSelectors.selectLoadedIds,
          entityStateSelectors.selectEntities,
          (ids: Id[], entities: Dictionary<EntityType>) => ids.map((id: Id) => entities[id]),
        );
      }
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
      defaultAppSelectors.selectIsOpenedId = createSelector(
        defaultAppSelectors.selectOpenedIds,
        (ids: Id[], props: PropId) => ids.includes(props.id),
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
    }
    if (this.initialState.focusedId !== undefined) {
      defaultAppSelectors.selectFocusedId = createSelector(
        appStateSelector,
        (appState: AppStateType) => appState.focusedId,
      );
      defaultAppSelectors.selectIsFocusedId = createSelector(
        defaultAppSelectors.selectFocusedId,
        (id: Id, props: PropId) => id === props.id,
      );
      if (entityStateSelectors) {
        defaultAppSelectors.selectFocusedEntity = createSelector(
          defaultAppSelectors.selectFocusedId,
          entityStateSelectors.selectEntities,
          (id: Id, entities: Dictionary<EntityType>) => entities[id],
        );
      }
    }
    return defaultAppSelectors;
  }

  public getActions(): EntityAppActions {
    return this.actions;
  }

  public getActionType(type: string) {
    const actionType = `[App][${this.entityName}] ${type}`;
    return actionType;
  }

  public getReducerFunctions(): On<AppStateType>[] {
    return this.reducers;
  }

  public getInitialState(): AppStateType {
    return this.initialState;
  }

  private initActions(): EntityAppActions {
    const defaultAppActions: EntityAppActions = {};
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
