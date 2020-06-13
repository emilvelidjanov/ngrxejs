import { Id } from './entity';

export const entityAppStateKey: string = 'EntityAppState';

export interface EntityAppState {
  typeKey: string;
  loadedIds?: Id[];
  openedIds?: Id[];
  focusedId?: Id;
}

export function instanceOfEntityAppState(object: any): object is EntityAppState {
  return 'typeKey' in object && object.typeKey === entityAppStateKey;
}

export const defaultInitialEntityAppState: EntityAppState = {
  typeKey: entityAppStateKey,
};
