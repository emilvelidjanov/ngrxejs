import { Id } from './entity';

export interface EntityAppState {
  typeKey: 'EntityAppState';
  loadedIds: Id[];
  openedIds: Id[];
  focusedId: Id;
}

export function instanceOfEntityAppState(object: any): object is EntityAppState {
  return 'typeKey' in object && object.typeKey === 'EntityAppState';
}

export const defaultInitialEntityAppState: EntityAppState = {
  typeKey: 'EntityAppState',
  loadedIds: [],
  openedIds: [],
  focusedId: null,
};
