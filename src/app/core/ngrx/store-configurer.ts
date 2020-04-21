import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


export class StoreConfigurer<Entity, Collection extends EntityState<Entity>> {

  private adapter: EntityAdapter<Entity>;
  private initialState: Collection;

  constructor(initialState: Collection) {
    this.adapter = createEntityAdapter<Entity>();
    this.initialState = this.adapter.getInitialState(initialState);
  }

  public getAdapter(): EntityAdapter<Entity> {
    return this.adapter;
  }

  public getInitialState(): Collection {
    return this.initialState;
  }
}