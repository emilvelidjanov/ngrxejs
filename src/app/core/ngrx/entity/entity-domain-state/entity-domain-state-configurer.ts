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

export class EntityDomainStateConfigurer<
  EntityType extends Entity,
  DomainStateType extends EntityDomainState<EntityType>
> {
  private adapter: EntityAdapter<EntityType>;
  private initialState: DomainStateType;
  private entityName: string;
  private actions: EntityDomainActions<EntityType>;
  private reducers: On<DomainStateType>[];

  constructor(entityName: string, initialState: DomainStateType) {
    this.adapter = createEntityAdapter<EntityType>();
    this.initialState = this.adapter.getInitialState(initialState);
    if (entityName) {
      entityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    }
    this.entityName = entityName;
    this.actions = this.initActions();
    this.reducers = this.initReducerFunctions();
  }

  public getSelectors(entityStateSelector: (state: object) => DomainStateType): EntityDomainSelectors<EntityType> {
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
    const selectors: EntityDomainSelectors<EntityType> = {
      ...defSelectors,
      selectEntityById,
      selectEntitiesByIds,
      selectIsInStore,
    };
    return selectors;
  }

  public getActions(): EntityDomainActions<EntityType> {
    return this.actions;
  }

  public getReducerFunctions(): On<DomainStateType>[] {
    return this.reducers;
  }

  public getAdapter(): EntityAdapter<EntityType> {
    return this.adapter;
  }

  public getInitialState(): DomainStateType {
    return this.initialState;
  }

  public getEntityName(): string {
    return this.entityName;
  }

  public getActionType(type: string) {
    const actionType = `[Domain][${this.entityName}] ${type}`;
    return actionType;
  }

  private initActions(): EntityDomainActions<EntityType> {
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

  private initReducerFunctions(): On<DomainStateType>[] {
    return [
      on(this.actions.addOne, (state: DomainStateType, props: PropEntity<EntityType>) => {
        return this.adapter.addOne(props.entity, state);
      }),
      on(this.actions.addMany, (state: DomainStateType, props: PropEntities<EntityType>) => {
        return this.adapter.addMany(props.entities, state);
      }),
      on(this.actions.setAll, (state: DomainStateType, props: PropEntities<EntityType>) => {
        return this.adapter.setAll(props.entities, state);
      }),
      on(this.actions.setOne, (state: DomainStateType, props: PropEntity<EntityType>) => {
        return this.adapter.setOne(props.entity, state);
      }),
      on(this.actions.removeOne, (state: DomainStateType, props: PropId) => {
        let typedId: any;
        if (typeof props.id === 'number') {
          typedId = props.id as number;
        } else {
          typedId = props.id as string;
        }
        return this.adapter.removeOne(typedId, state);
      }),
      on(this.actions.removeMany, (state: DomainStateType, props: PropIds) => {
        const numberIds: number[] = props.ids.filter((id: Id) => typeof id === 'number') as number[];
        const stringIds: string[] = props.ids.filter((id: Id) => typeof id === 'string') as string[];
        return this.adapter.removeMany(stringIds, this.adapter.removeMany(numberIds, state));
      }),
      on(this.actions.removeByPredicate, (state: DomainStateType, props: PropPredicate<EntityType>) => {
        return this.adapter.removeMany(props.predicate, state);
      }),
      on(this.actions.removeAll, (state: DomainStateType) => {
        return this.adapter.removeAll(state);
      }),
      on(this.actions.updateOne, (state: DomainStateType, props: PropUpdate<EntityType>) => {
        return this.adapter.updateOne(props.update, state);
      }),
      on(this.actions.updateMany, (state: DomainStateType, props: PropUpdates<EntityType>) => {
        return this.adapter.updateMany(props.updates, state);
      }),
      on(this.actions.upsertOne, (state: DomainStateType, props: PropEntity<EntityType>) => {
        return this.adapter.upsertOne(props.entity, state);
      }),
      on(this.actions.upsertMany, (state: DomainStateType, props: PropEntities<EntityType>) => {
        return this.adapter.upsertMany(props.entities, state);
      }),
      on(this.actions.map, (state: DomainStateType, props: PropEntityMap<EntityType>) => {
        return this.adapter.map(props.entityMap, state);
      }),
    ];
  }
}
