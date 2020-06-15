import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Dictionary } from '@ngrx/entity/src/models';
import { createAction, createSelector, on, On, props } from '@ngrx/store';

import { Entity, Id } from '../entity';

import { EntityDomainActions } from './entity-domain-actions';
import { EntityDomainSelectors } from './entity-domain-selectors';
import { EntityDomainState } from './entity-domain-state';
import {
  PropEntities,
  PropEntity,
  PropEntityMap,
  PropId,
  PropIds,
  PropPredicate,
  PropUpdate,
  PropUpdates,
} from './props';

export class EntityDomainStateConfigurer<T extends Entity, D extends EntityDomainState<T>> {
  private adapter: EntityAdapter<T>;
  private initialState: D;
  private entityName: string;
  private actions: EntityDomainActions<T>;
  private reducers: On<D>[];

  constructor(entityName: string, initialState: D) {
    this.adapter = createEntityAdapter<T>();
    this.initialState = this.adapter.getInitialState(initialState);
    if (entityName) {
      entityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    }
    this.entityName = entityName;
    this.actions = this.initActions();
    this.reducers = this.initReducerFunctions();
  }

  public getSelectors(entityStateSelector: (state: object) => D): EntityDomainSelectors<T> {
    const defSelectors = this.adapter.getSelectors(entityStateSelector);
    const selectEntityById = createSelector(
      defSelectors.selectEntities,
      (entities: Dictionary<T>, props: PropId) => entities[props.id],
    );
    const selectEntitiesByIds = createSelector(defSelectors.selectEntities, (entities: Dictionary<T>, props: PropIds) =>
      props.ids.map((id: Id) => entities[id]),
    );
    const selectIsInStore = createSelector(
      defSelectors.selectEntities,
      (entities: Dictionary<T>, props: PropId) => entities[props.id] !== undefined,
    );
    const selectors: EntityDomainSelectors<T> = {
      ...defSelectors,
      selectEntityById,
      selectEntitiesByIds,
      selectIsInStore,
    };
    return selectors;
  }

  public getActions(): EntityDomainActions<T> {
    return this.actions;
  }

  public getReducerFunctions(): On<D>[] {
    return this.reducers;
  }

  public getAdapter(): EntityAdapter<T> {
    return this.adapter;
  }

  public getInitialState(): D {
    return this.initialState;
  }

  public getEntityName(): string {
    return this.entityName;
  }

  public getActionType(type: string) {
    const actionType = `[Domain][${this.entityName}] ${type}`;
    return actionType;
  }

  private initActions(): EntityDomainActions<T> {
    return {
      addOne: createAction(this.getActionType('Add One'), props<PropEntity<T>>()),
      addMany: createAction(this.getActionType('Add Many'), props<PropEntities<T>>()),
      setOne: createAction(this.getActionType('Set One'), props<PropEntity<T>>()),
      setAll: createAction(this.getActionType('Set All'), props<PropEntities<T>>()),
      removeOne: createAction(this.getActionType('Remove One'), props<PropId>()),
      removeMany: createAction(this.getActionType('Remove Many'), props<PropIds>()),
      removeByPredicate: createAction(this.getActionType('Remove By Predicate'), props<PropPredicate<T>>()),
      removeAll: createAction(this.getActionType('Remove All')),
      updateOne: createAction(this.getActionType('Update One'), props<PropUpdate<T>>()),
      updateMany: createAction(this.getActionType('Update Many'), props<PropUpdates<T>>()),
      upsertOne: createAction(this.getActionType('Upsert One'), props<PropEntity<T>>()),
      upsertMany: createAction(this.getActionType('Upsert Many'), props<PropEntities<T>>()),
      map: createAction(this.getActionType('Map'), props<PropEntityMap<T>>()),
    };
  }

  private initReducerFunctions(): On<D>[] {
    return [
      on(this.actions.addOne, (state: D, props: PropEntity<T>) => {
        return this.adapter.addOne(props.entity, state);
      }),
      on(this.actions.addMany, (state: D, props: PropEntities<T>) => {
        return this.adapter.addMany(props.entities, state);
      }),
      on(this.actions.setAll, (state: D, props: PropEntities<T>) => {
        return this.adapter.setAll(props.entities, state);
      }),
      on(this.actions.setOne, (state: D, props: PropEntity<T>) => {
        return this.adapter.setOne(props.entity, state);
      }),
      on(this.actions.removeOne, (state: D, props: PropId) => {
        let typedId: any;
        if (typeof props.id === 'number') {
          typedId = props.id as number;
        } else {
          typedId = props.id as string;
        }
        return this.adapter.removeOne(typedId, state);
      }),
      on(this.actions.removeMany, (state: D, props: PropIds) => {
        const numberIds: number[] = props.ids.filter((id: Id) => typeof id === 'number') as number[];
        const stringIds: string[] = props.ids.filter((id: Id) => typeof id === 'string') as string[];
        return this.adapter.removeMany(stringIds, this.adapter.removeMany(numberIds, state));
      }),
      on(this.actions.removeByPredicate, (state: D, props: PropPredicate<T>) => {
        return this.adapter.removeMany(props.predicate, state);
      }),
      on(this.actions.removeAll, (state: D) => {
        return this.adapter.removeAll(state);
      }),
      on(this.actions.updateOne, (state: D, props: PropUpdate<T>) => {
        return this.adapter.updateOne(props.update, state);
      }),
      on(this.actions.updateMany, (state: D, props: PropUpdates<T>) => {
        return this.adapter.updateMany(props.updates, state);
      }),
      on(this.actions.upsertOne, (state: D, props: PropEntity<T>) => {
        return this.adapter.upsertOne(props.entity, state);
      }),
      on(this.actions.upsertMany, (state: D, props: PropEntities<T>) => {
        return this.adapter.upsertMany(props.entities, state);
      }),
      on(this.actions.map, (state: D, props: PropEntityMap<T>) => {
        return this.adapter.map(props.entityMap, state);
      }),
    ];
  }
}
