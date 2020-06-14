import { Dictionary } from '@ngrx/entity';
import { createAction, createSelector, On, on, props } from '@ngrx/store';

import { Entity, Id } from '../entity';
import { EntityDomainSelectors } from '../entity-domain-state/entity-domain-selectors';
import { PropId, PropIds } from '../entity-domain-state/props';

import { EntityAppActions } from './entity-app-actions';
import { EntityAppSelectors } from './entity-app-selectors';
import { EntityAppState } from './entity-app-state';

export class EntityAppStateConfigurer<T extends Entity, A extends EntityAppState> {
  private entityName: string;
  private initialState: A;
  private actions: EntityAppActions;
  private reducers: On<A>[];

  constructor(entityName: string, initialState: A) {
    this.entityName = entityName;
    this.initialState = initialState;
    this.actions = this.initActions();
    this.reducers = this.initReducerFunctions();
  }

  public getSelectors(
    appStateSelector: (state: object) => A,
    entityStateSelectors?: EntityDomainSelectors<T>,
  ): EntityAppSelectors<T> {
    const defaultAppSelectors: EntityAppSelectors<T> = {};
    if (this.initialState.loadedIds !== undefined) {
      defaultAppSelectors.selectLoadedIds = createSelector(appStateSelector, (appState: A) => appState.loadedIds);
      if (entityStateSelectors) {
        defaultAppSelectors.selectLoadedEntities = createSelector(
          defaultAppSelectors.selectLoadedIds,
          entityStateSelectors.selectEntities,
          (ids: Id[], entities: Dictionary<T>) => ids.map((id: Id) => entities[id]),
        );
      }
      defaultAppSelectors.selectIsLoadedId = createSelector(
        defaultAppSelectors.selectLoadedIds,
        (ids: Id[], props: PropId) => ids.includes(props.id),
      );
    }
    if (this.initialState.openedIds !== undefined) {
      defaultAppSelectors.selectOpenedIds = createSelector(appStateSelector, (appState: A) => appState.openedIds);
      defaultAppSelectors.selectFirstOpenedId = createSelector(
        defaultAppSelectors.selectOpenedIds,
        (ids: Id[]) => ids[0],
      );
      if (entityStateSelectors) {
        defaultAppSelectors.selectOpenedEntities = createSelector(
          defaultAppSelectors.selectOpenedIds,
          entityStateSelectors.selectEntities,
          (ids: Id[], entities: Dictionary<T>) => ids.map((id: Id) => entities[id]),
        );
        defaultAppSelectors.selectFirstOpenedEntity = createSelector(
          defaultAppSelectors.selectOpenedEntities,
          (entities: T[]) => entities[0],
        );
      }
      defaultAppSelectors.selectIsOpenedId = createSelector(
        defaultAppSelectors.selectOpenedIds,
        (ids: Id[], props: PropId) => ids.includes(props.id),
      );
    }
    if (this.initialState.focusedId !== undefined) {
      defaultAppSelectors.selectFocusedId = createSelector(appStateSelector, (appState: A) => appState.focusedId);
      if (entityStateSelectors) {
        defaultAppSelectors.selectFocusedEntity = createSelector(
          defaultAppSelectors.selectFocusedId,
          entityStateSelectors.selectEntities,
          (id: Id, entities: Dictionary<T>) => entities[id],
        );
      }
      defaultAppSelectors.selectIsFocusedId = createSelector(
        defaultAppSelectors.selectFocusedId,
        (id: Id, props: PropId) => id === props.id,
      );
    }
    return defaultAppSelectors;
  }

  public getActions(): EntityAppActions {
    return this.actions;
  }

  public getActionType(type: string) {
    const actionType = `[${this.entityName}] ${type}`;
    return actionType;
  }

  public getReducerFunctions(): On<A>[] {
    return this.reducers;
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

  private initReducerFunctions(): On<A>[] {
    const reducerFunctions: On<A>[] = [];
    if (this.initialState.loadedIds !== undefined) {
      reducerFunctions.push(
        on(this.actions.addLoadedId, (state: A, props: PropId) => {
          return { ...state, loadedIds: [...state.loadedIds, props.id] };
        }),
      );
    }
    if (this.initialState.openedIds !== undefined) {
      reducerFunctions.push(
        on(this.actions.addOpenedId, (state: A, props: PropId) => {
          return { ...state, openedIds: [...state.openedIds, props.id] };
        }),
        on(this.actions.removeOpenedId, (state: A, props: PropId) => {
          return { ...state, openedIds: state.openedIds.filter((id: Id) => id !== props.id) };
        }),
        on(this.actions.setOpenedIds, (state: A, props: PropIds) => {
          return { ...state, openedIds: props.ids };
        }),
      );
    }
    if (this.initialState.focusedId !== undefined) {
      reducerFunctions.push(
        on(this.actions.setFocusedId, (state: A, props: PropId) => {
          return { ...state, focusedId: props.id };
        }),
      );
    }
    return reducerFunctions;
  }
}
