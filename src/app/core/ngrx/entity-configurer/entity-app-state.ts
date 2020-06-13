import { Id } from './entity';

export const entityAppStateKey: string = 'EntityAppState';

export interface EntityAppState {
  loadedIds?: Id[];
  openedIds?: Id[];
  focusedId?: Id;
}
