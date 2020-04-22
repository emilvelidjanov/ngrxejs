import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { EntitySelectors } from '@ngrx/entity/src/models';


export class StoreConfigurer<Entity, Collection extends EntityState<Entity>> {

  private adapter: EntityAdapter<Entity>;
  private initialState: Collection;

  constructor(initialState: Collection) {
    this.adapter = createEntityAdapter<Entity>();
    this.initialState = this.adapter.getInitialState(initialState);
  }

  public getSelectors(collectionSelector: (state: object) => Collection): EntitySelectors<Entity, object> {
    return this.adapter.getSelectors(collectionSelector);
  }

  public getAdapter(): EntityAdapter<Entity> {
    return this.adapter;
  }

  public getInitialState(): Collection {
    return this.initialState;
  }
}