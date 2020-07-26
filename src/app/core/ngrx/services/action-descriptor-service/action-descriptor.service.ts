import { Store } from '@ngrx/store';

import { ActionDescriptor } from '../../action-descriptor';

export interface ActionDescriptorService {
  dispatch(action: ActionDescriptor, store: Store<object>): void;
}
