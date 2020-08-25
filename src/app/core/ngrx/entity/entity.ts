export interface Entity {
  id: Id;
}

export type Id = number | string;
export type IdLessPartial<T extends Entity> = Partial<Omit<T, 'id'>>;
export type EntityPartial<T extends Entity> = Pick<T, 'id'> & IdLessPartial<T>;
