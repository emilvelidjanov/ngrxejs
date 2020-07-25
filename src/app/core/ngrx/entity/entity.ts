export interface Entity {
  id: Id;
}

export type Id = number | string;
export type EntityPartial<T extends Entity> = Pick<T, 'id'> & Partial<Omit<T, 'id'>>;
