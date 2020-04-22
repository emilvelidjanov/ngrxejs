import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { EntitySelectors, Predicate, Update, EntityMap } from '@ngrx/entity/src/models';
import { createAction, props } from '@ngrx/store';
import { Id } from './entity';


export class StoreConfigurer<Entity, Collection extends EntityState<Entity>> {

  private adapter: EntityAdapter<Entity>;
  private initialState: Collection;
  private entityName: string;

  constructor(entityName: string, initialState: Collection) {
    this.adapter = createEntityAdapter<Entity>();
    this.initialState = this.adapter.getInitialState(initialState);
    if (entityName) {
      entityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    }
    this.entityName = entityName;
  }

  public getSelectors(collectionSelector: (state: object) => Collection): EntitySelectors<Entity, object> {
    return this.adapter.getSelectors(collectionSelector);
  }

  public getActions() {
    return {
      addOne: createAction(`[${this.entityName}] Add One`, props<{entity: Entity}>()),
      addMany: createAction(`[${this.entityName}] Add Many`, props<{entities: Entity[]}>()),
      setAll: createAction(`[${this.entityName}] Set All`, props<{entities: Entity[]}>()),
      setOne: createAction(`[${this.entityName}] Set One`, props<{entity: Entity}>()),
      removeOne: createAction(`[${this.entityName}] Remove One`, props<{id: Id}>()),
      removeMany: createAction(`[${this.entityName}] Remove Many`, props<{id: Id[]}>()),
      removeByPredicate: createAction(`[${this.entityName}] Remove By Predicate`, props<{predicate: Predicate<Entity>}>()),
      removeAll: createAction(`[${this.entityName}] Remove All`),
      updateOne: createAction(`[${this.entityName}] Update One`, props<{update: Update<Entity>}>()),
      updateMany: createAction(`[${this.entityName}] Update Many`, props<{update: Update<Entity>[]}>()),
      upsertOne: createAction(`[${this.entityName}] Upsert One`, props<{entity: Entity}>()),
      upsertMany: createAction(`[${this.entityName}] Upsert Many`, props<{entities: Entity[]}>()),
      map: createAction(`[${this.entityName}] Map`, props<{entityMap: EntityMap<Entity>}>()),
    }
  }

  public getAdapter(): EntityAdapter<Entity> {
    return this.adapter;
  }

  public getInitialState(): Collection {
    return this.initialState;
  }
}