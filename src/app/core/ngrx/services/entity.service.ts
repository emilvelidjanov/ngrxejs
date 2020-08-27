import { Observable } from 'rxjs';

import { Entity, EntityPartial, Id, IdLessPartial } from '../entity/entity';

export interface EntityService<T extends Entity> {
  createDefault(partial: EntityPartial<T>): T;
  createOne(partial: IdLessPartial<T>): Observable<T>;
  createMany(partials: IdLessPartial<T>[]): Observable<T[]>;
  addOne(entity: T): void;
  addMany(entities: T[]): void;
  selectOne(id: Id): Observable<T>;
  selectMany(ids: Id[]): Observable<T[]>;
}
