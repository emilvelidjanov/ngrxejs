import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { EntitySelectors, Predicate, Update, EntityMap } from '@ngrx/entity/src/models';
import { createAction, props, on, On, ActionCreator } from '@ngrx/store';
import { Id, Entity } from './entity';
import { TypedAction } from '@ngrx/store/src/models';


export class StoreConfigurer<EntityType extends Entity, CollectionType extends EntityState<EntityType>> {

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

  public getSelectors(collectionSelector: (state: object) => CollectionType): EntitySelectors<EntityType, object> {
    return this.adapter.getSelectors(collectionSelector);
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
      addOne: createAction(this.getActionType("Add One"), props<PropEntity<EntityType>>()),
      addMany: createAction(this.getActionType("Add Many"), props<PropEntities<EntityType>>()),
      setOne: createAction(this.getActionType("Set One"), props<PropEntity<EntityType>>()),
      setAll: createAction(this.getActionType("Set All"), props<PropEntities<EntityType>>()),
      removeOne: createAction(this.getActionType("Remove One"), props<PropId>()),
      removeMany: createAction(this.getActionType("Remove Many"), props<PropIds>()),
      removeByPredicate: createAction(this.getActionType("Remove By Predicate"), props<PropPredicate<EntityType>>()),
      removeAll: createAction(this.getActionType("Remove All")),
      updateOne: createAction(this.getActionType("Update One"), props<PropUpdate<EntityType>>()),
      updateMany: createAction(this.getActionType("Update Many"), props<PropUpdates<EntityType>>()),
      upsertOne: createAction(this.getActionType("Upsert One"), props<PropEntity<EntityType>>()),
      upsertMany: createAction(this.getActionType("Upsert Many"), props<PropEntities<EntityType>>()),
      map: createAction(this.getActionType("Map"), props<{entityMap: EntityMap<EntityType>}>()),
    }
  }

  private initReducerFunctions(): On<CollectionType>[] {
    return [
      on(this.actions.addOne, (state: CollectionType, {entity}) => {
        return this.adapter.addOne(entity, state);
      }),
      on(this.actions.addMany, (state: CollectionType, {entities}) => {
        return this.adapter.addMany(entities, state);
      }),
      on(this.actions.setAll, (state: CollectionType, {entities}) => {
        return this.adapter.setAll(entities, state);
      }),
      on(this.actions.setOne, (state: CollectionType, {entity}) => {
        return this.adapter.setOne(entity, state);
      }),
      on(this.actions.removeOne, (state: CollectionType, {id}) => {
        let typedId: any;
        if (typeof id === "number") typedId = id as number;
        else typedId = id as string;
        return this.adapter.removeOne(typedId, state);
      }),
      on(this.actions.removeMany, (state: CollectionType, {ids}) => {
        let numberIds: number[] = ids.filter((id: Id) => typeof id === "number") as number[];
        let stringIds: string[] = ids.filter((id: Id) => typeof id === "string") as string[];
        return this.adapter.removeMany(stringIds, this.adapter.removeMany(numberIds, state));
      }),
      on(this.actions.removeByPredicate, (state: CollectionType, {predicate}) => {
        return this.adapter.removeMany(predicate, state);
      }),
      on(this.actions.removeAll, (state: CollectionType) => {
        return this.adapter.removeAll(state);
      }),
      on(this.actions.updateOne, (state: CollectionType, {update}) => {
        return this.adapter.updateOne(update, state);
      }),
      on(this.actions.updateMany, (state: CollectionType, {updates}) => {
        return this.adapter.updateMany(updates, state);
      }),
      on(this.actions.upsertOne, (state: CollectionType, {entity}) => {
        return this.adapter.upsertOne(entity, state);
      }),
      on(this.actions.upsertMany, (state: CollectionType, {entities}) => {
        return this.adapter.upsertMany(entities, state);
      }),
      on(this.actions.map, (state: CollectionType, {entityMap}) => {
        return this.adapter.map(entityMap, state);
      }),
    ]
  }
}

export interface DefaultActions<T> {
  addOne: ActionCreator<string, (props: PropEntity<T>) => PropEntity<T> & TypedAction<string>>,
  addMany: ActionCreator<string, (props: PropEntities<T>) => PropEntities<T> & TypedAction<string>>,
  setOne: ActionCreator<string, (props: PropEntity<T>) => PropEntity<T> & TypedAction<string>>,
  setAll: ActionCreator<string, (props: PropEntities<T>) => PropEntities<T> & TypedAction<string>>,
  removeOne: ActionCreator<string, (props: PropId) => PropId & TypedAction<string>>,
  removeMany: ActionCreator<string, (props: PropIds) => PropIds & TypedAction<string>>,
  removeByPredicate: ActionCreator<string, (props: PropPredicate<T>) => PropPredicate<T> & TypedAction<string>>,
  removeAll: ActionCreator<string, () => TypedAction<string>>,
  updateOne: ActionCreator<string, (props: PropUpdate<T>) => PropUpdate<T> & TypedAction<string>>,
  updateMany: ActionCreator<string, (props: PropUpdates<T>) => PropUpdates<T> & TypedAction<string>>,
  upsertOne: ActionCreator<string, (props: PropEntity<T>) => PropEntity<T> & TypedAction<string>>,
  upsertMany: ActionCreator<string, (props: PropEntities<T>) => PropEntities<T> & TypedAction<string>>,
  map: ActionCreator<string, (props: PropEntityMap<T>) => PropEntityMap<T> & TypedAction<string>>,
}

export interface PropEntity<T> {
  entity: T,
}

export interface PropEntities<T> {
  entities: T[],
}

export interface PropId {
  id: Id,
}

export interface PropIds {
  ids: Id[],
}

export interface PropPredicate<T> {
  predicate: Predicate<T>,
}

export interface PropUpdate<T> {
  update: Update<T>,
}

export interface PropUpdates<T> {
  updates: Update<T>[],
}

export interface PropEntityMap<T> {
  entityMap: EntityMap<T>,
}