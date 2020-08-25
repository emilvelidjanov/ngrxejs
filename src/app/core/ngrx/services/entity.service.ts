import { Observable } from 'rxjs';

import { Entity, EntityPartial, Id, IdLessPartial } from '../entity/entity';

export interface EntityService<T extends Entity> {
  createDefault(partial: EntityPartial<T>): T;
  createOne(partial: IdLessPartial<T>): Observable<T>;
  createMany(partials: IdLessPartial<T>[]): Observable<T[]>;
  addOne(entity: T): void;
  addMany(entities: T[]): void;
  select(id: Id): Observable<T>;
  selectByIds(ids: Id[]): Observable<T[]>;
}
