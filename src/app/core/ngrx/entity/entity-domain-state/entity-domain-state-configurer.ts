import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Dictionary, Update, UpdateNum, UpdateStr } from '@ngrx/entity/src/models';
import { createAction, createSelector, on, props, ReducerTypes } from '@ngrx/store';

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
  PropPartial,
  PropPredicate,
  PropUpdate,
  PropUpdates,
  PropUpdatesSame,
} from './props';

export class EntityDomainStateConfigurer<T extends Entity, D extends EntityDomainState<T>> {
  private adapter: EntityAdapter<T>;
  private initialState: D;
  private entityName: string;
  private actions: EntityDomainActions<T>;
  // TODO: correct typing?
  private reducers: ReducerTypes<D, any>[];

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

  // TODO: rename selectors: "selectOne" -> "One"
  public getSelectors(entityStateSelector: (state: object) => D): EntityDomainSelectors<T> {
    const defSelectors = this.adapter.getSelectors(entityStateSelector);
    const selectEntityById = createSelector(defSelectors.selectEntities, (entities: Dictionary<T>, props: PropId) => entities[props.id]);
    const selectEntitiesByIds = createSelector(defSelectors.selectEntities, (entities: Dictionary<T>, props: PropIds) =>
      props.ids.map((id: Id) => entities[id]),
    );
    const selectEntitiesByPredicate = createSelector(defSelectors.selectAll, (entities: T[], props: PropPredicate<T>) =>
      entities.filter((entity) => props.predicate(entity)),
    );
    const selectors: EntityDomainSelectors<T> = {
      ...defSelectors,
      selectEntityById,
      selectEntitiesByIds,
      selectEntitiesByPredicate,
    };
    return selectors;
  }

  public getActions(): EntityDomainActions<T> {
    return this.actions;
  }

  public getReducerFunctions(): ReducerTypes<D, any>[] {
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
    return `[Domain][${this.entityName}] ${type}`;
  }

  // TODO: rename to "Event"?
  public getEffectActionType(type: string) {
    return `[Effect][${this.entityName}] ${type}`;
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
      updateManySame: createAction(this.getActionType('Update Many Same'), props<PropUpdatesSame<T>>()),
      updateAll: createAction(this.getActionType('Update All'), props<PropPartial<T>>()),
      upsertOne: createAction(this.getActionType('Upsert One'), props<PropEntity<T>>()),
      upsertMany: createAction(this.getActionType('Upsert Many'), props<PropEntities<T>>()),
      map: createAction(this.getActionType('Map'), props<PropEntityMap<T>>()),
    };
  }

  private initReducerFunctions(): ReducerTypes<D, any>[] {
    return [
      on(this.actions.addOne, (state: D, props: PropEntity<T>) => {
        const isNew = !state.entities[props.entity.id];
        if (isNew) {
          return this.adapter.addOne(props.entity, state);
        } else {
          return { ...state };
        }
      }),
      on(this.actions.addMany, (state: D, props: PropEntities<T>) => {
        const newEntities = props.entities.filter((entity) => !state.entities[entity.id]);
        return this.adapter.addMany(newEntities, state);
      }),
      on(this.actions.setAll, (state: D, props: PropEntities<T>) => {
        return this.adapter.setAll(props.entities, state);
      }),
      on(this.actions.setOne, (state: D, props: PropEntity<T>) => {
        return this.adapter.setOne(props.entity, state);
      }),
      on(this.actions.removeOne, (state: D, props: PropId) => {
        let typedId: any;
        typeof props.id === 'number' ? (typedId = props.id as number) : (typedId = props.id as string);
        return this.adapter.removeOne(typedId, state);
      }),
      on(this.actions.removeMany, (state: D, props: PropIds) => {
        const numberIds = props.ids.filter((id) => typeof id === 'number') as number[];
        const stringIds = props.ids.filter((id) => typeof id === 'string') as string[];
        return this.adapter.removeMany(stringIds, this.adapter.removeMany(numberIds, state));
      }),
      on(this.actions.removeByPredicate, (state: D, props: PropPredicate<T>) => {
        return this.adapter.removeMany(props.predicate, state);
      }),
      on(this.actions.removeAll, (state: D) => {
        return this.adapter.removeAll(state);
      }),
      on(this.actions.updateOne, (state: D, props: PropUpdate<T>) => {
        const update = typeof props.update.id === 'number' ? ({ ...props.update } as UpdateNum<T>) : ({ ...props.update } as UpdateStr<T>);
        return this.adapter.updateOne(update, state);
      }),
      on(this.actions.updateMany, (state: D, props: PropUpdates<T>) => {
        const updates = props.updates.map((update) =>
          typeof update.id === 'number' ? ({ ...update } as UpdateNum<T>) : ({ ...update } as UpdateStr<T>),
        );
        return this.adapter.updateMany(updates, state);
      }),
      on(this.actions.updateManySame, (state: D, props: PropUpdatesSame<T>) => {
        const updates = props.ids.map((id) =>
          typeof id === 'number' ? ({ id, changes: props.partial } as UpdateNum<T>) : ({ id, changes: props.partial } as UpdateStr<T>),
        );
        return this.adapter.updateMany(updates, state);
      }),
      on(this.actions.updateAll, (state: D, props: PropPartial<T>) => {
        const ids: Id[] = state.ids;
        const updates: Update<T>[] = ids.map((id: Id) =>
          typeof id === 'number'
            ? {
                id: id as number,
                changes: props.partial,
              }
            : {
                id: id as string,
                changes: props.partial,
              },
        );
        return this.adapter.updateMany(updates, state);
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
