import { Observable } from 'rxjs';

import { Entity, EntityPartial, Id, IdLessPartial } from '../entity/entity';

// TODO: implement helper service with default helper methods to reduce boilerplate?
export interface EntityService<T extends Entity> {
  createDefault(partial: EntityPartial<T>): T;
  createOne(partial: IdLessPartial<T>): Observable<T>;
  createMany(partials: IdLessPartial<T>[]): Observable<T[]>;
  addOne(entity: T): void;
  addMany(entities: T[]): void;
  selectOne(id: Id): Observable<T>;
  selectMany(ids: Id[]): Observable<T[]>;
  selectAll(): Observable<T[]>;
  removeOne(entity: T): void;
  removeMany(entities: T[]): void;
}
