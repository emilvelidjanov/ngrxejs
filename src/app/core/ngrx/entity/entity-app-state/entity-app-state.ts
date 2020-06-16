import { Id } from '../entity';

export interface EntityAppState {
  loadedIds?: Id[];
  openedIds?: Id[];
  focusedId?: Id;
}
