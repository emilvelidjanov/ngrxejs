import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Dictionary, EntityMap, EntitySelectors, Predicate, Update } from '@ngrx/entity/src/models';
import { ActionCreator, createAction, createSelector, on, On, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { Entity, Id } from './entity';

export class EntityStateConfigurer<EntityType extends Entity, CollectionType extends EntityState<EntityType>> {
  private adapter: EntityAdapter<EntityType>;
  private initialState: CollectionType;
  private entityName: string;
  private actions: DefaultActions<EntityType>;
  private reducers: On<CollectionType>[];

  constructor(entityName: string, initialState: CollectionType) {
    this.adapter = createEntityAdapter<EntityType>();
    this.initialState = this.adapter.getInitialState(initialState);
    if (entityName) {
      entityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    }
    this.entityName = entityName;
    this.actions = this.initActions();
    this.reducers = this.initReducerFunctions();
  }

  public getSelectors(entityStateSelector: (state: object) => CollectionType): DefaultSelectors<EntityType> {
    const defSelectors = this.adapter.getSelectors(entityStateSelector);
    const selectEntityById = createSelector(
      defSelectors.selectEntities,
      (entities: Dictionary<EntityType>, props: PropId) => entities[props.id],
    );
    const selectEntitiesByIds = createSelector(
      defSelectors.selectEntities,
      (entities: Dictionary<EntityType>, props: PropIds) => props.ids.map((id: Id) => entities[id]),
    );
    const selectIsInStore = createSelector(
      defSelectors.selectEntities,
      (entities: Dictionary<EntityType>, props: PropId) => entities[props.id] !== undefined,
    );
    const selectors: DefaultSelectors<EntityType> = {
      ...defSelectors,
      selectEntityById,
      selectEntitiesByIds,
      selectIsInStore,
    };
    return selectors;
  }

  public getActions(): DefaultActions<EntityType> {
    return this.actions;
  }

  public getReducerFunctions(): On<CollectionType>[] {
    return this.reducers;
  }

  public getAdapter(): EntityAdapter<EntityType> {
    return this.adapter;
  }

  public getInitialState(): CollectionType {
    return this.initialState;
  }

  public getEntityName(): string {
    return this.entityName;
  }

  public getActionType(type: string) {
    const actionType = `[${this.entityName}] ${type}`;
    return actionType;
  }

  private initActions(): DefaultActions<EntityType> {
    return {
      addOne: createAction(this.getActionType('Add One'), props<PropEntity<EntityType>>()),
      addMany: createAction(this.getActionType('Add Many'), props<PropEntities<EntityType>>()),
      setOne: createAction(this.getActionType('Set One'), props<PropEntity<EntityType>>()),
      setAll: createAction(this.getActionType('Set All'), props<PropEntities<EntityType>>()),
      removeOne: createAction(this.getActionType('Remove One'), props<PropId>()),
      removeMany: createAction(this.getActionType('Remove Many'), props<PropIds>()),
      removeByPredicate: createAction(this.getActionType('Remove By Predicate'), props<PropPredicate<EntityType>>()),
      removeAll: createAction(this.getActionType('Remove All')),
      updateOne: createAction(this.getActionType('Update One'), props<PropUpdate<EntityType>>()),
      updateMany: createAction(this.getActionType('Update Many'), props<PropUpdates<EntityType>>()),
      upsertOne: createAction(this.getActionType('Upsert One'), props<PropEntity<EntityType>>()),
      upsertMany: createAction(this.getActionType('Upsert Many'), props<PropEntities<EntityType>>()),
      map: createAction(this.getActionType('Map'), props<PropEntityMap<EntityType>>()),
    };
  }

  private initReducerFunctions(): On<CollectionType>[] {
    return [
      on(this.actions.addOne, (state: CollectionType, props: PropEntity<EntityType>) => {
        return this.adapter.addOne(props.entity, state);
      }),
      on(this.actions.addMany, (state: CollectionType, props: PropEntities<EntityType>) => {
        return this.adapter.addMany(props.entities, state);
      }),
      on(this.actions.setAll, (state: CollectionType, props: PropEntities<EntityType>) => {
        return this.adapter.setAll(props.entities, state);
      }),
      on(this.actions.setOne, (state: CollectionType, props: PropEntity<EntityType>) => {
        return this.adapter.setOne(props.entity, state);
      }),
      on(this.actions.removeOne, (state: CollectionType, props: PropId) => {
        let typedId: any;
        if (typeof props.id === 'number') {
          typedId = props.id as number;
        } else {
          typedId = props.id as string;
        }
        return this.adapter.removeOne(typedId, state);
      }),
      on(this.actions.removeMany, (state: CollectionType, props: PropIds) => {
        const numberIds: number[] = props.ids.filter((id: Id) => typeof id === 'number') as number[];
        const stringIds: string[] = props.ids.filter((id: Id) => typeof id === 'string') as string[];
        return this.adapter.removeMany(stringIds, this.adapter.removeMany(numberIds, state));
      }),
      on(this.actions.removeByPredicate, (state: CollectionType, props: PropPredicate<EntityType>) => {
        return this.adapter.removeMany(props.predicate, state);
      }),
      on(this.actions.removeAll, (state: CollectionType) => {
        return this.adapter.removeAll(state);
      }),
      on(this.actions.updateOne, (state: CollectionType, props: PropUpdate<EntityType>) => {
        return this.adapter.updateOne(props.update, state);
      }),
      on(this.actions.updateMany, (state: CollectionType, props: PropUpdates<EntityType>) => {
        return this.adapter.updateMany(props.updates, state);
      }),
      on(this.actions.upsertOne, (state: CollectionType, props: PropEntity<EntityType>) => {
        return this.adapter.upsertOne(props.entity, state);
      }),
      on(this.actions.upsertMany, (state: CollectionType, props: PropEntities<EntityType>) => {
        return this.adapter.upsertMany(props.entities, state);
      }),
      on(this.actions.map, (state: CollectionType, props: PropEntityMap<EntityType>) => {
        return this.adapter.map(props.entityMap, state);
      }),
    ];
  }
}

export interface DefaultSelectors<T extends Entity> extends EntitySelectors<T, object> {
  selectEntityById: (state: object, props: PropId) => T;
  selectEntitiesByIds: (state: object, props: PropIds) => T[];
  selectIsInStore: (state: object, props: PropId) => boolean;
}

export interface DefaultActions<T extends Entity> {
  addOne: ActionCreator<string, (props: PropEntity<T>) => PropEntity<T> & TypedAction<string>>;
  addMany: ActionCreator<string, (props: PropEntities<T>) => PropEntities<T> & TypedAction<string>>;
  setOne: ActionCreator<string, (props: PropEntity<T>) => PropEntity<T> & TypedAction<string>>;
  setAll: ActionCreator<string, (props: PropEntities<T>) => PropEntities<T> & TypedAction<string>>;
  removeOne: ActionCreator<string, (props: PropId) => PropId & TypedAction<string>>;
  removeMany: ActionCreator<string, (props: PropIds) => PropIds & TypedAction<string>>;
  removeByPredicate: ActionCreator<string, (props: PropPredicate<T>) => PropPredicate<T> & TypedAction<string>>;
  removeAll: ActionCreator<string, () => TypedAction<string>>;
  updateOne: ActionCreator<string, (props: PropUpdate<T>) => PropUpdate<T> & TypedAction<string>>;
  updateMany: ActionCreator<string, (props: PropUpdates<T>) => PropUpdates<T> & TypedAction<string>>;
  upsertOne: ActionCreator<string, (props: PropEntity<T>) => PropEntity<T> & TypedAction<string>>;
  upsertMany: ActionCreator<string, (props: PropEntities<T>) => PropEntities<T> & TypedAction<string>>;
  map: ActionCreator<string, (props: PropEntityMap<T>) => PropEntityMap<T> & TypedAction<string>>;
}

export interface PropEntity<T extends Entity> {
  entity: T;
}

export interface PropEntities<T extends Entity> {
  entities: T[];
}

export interface PropId {
  id: Id;
}

export interface PropIds {
  ids: Id[];
}

export interface PropPredicate<T extends Entity> {
  predicate: Predicate<T>;
}

export interface PropUpdate<T extends Entity> {
  update: Update<T>;
}

export interface PropUpdates<T extends Entity> {
  updates: Update<T>[];
}

export interface PropEntityMap<T extends Entity> {
  entityMap: EntityMap<T>;
}
