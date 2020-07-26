import { Action, Store } from '@ngrx/store';

import { ActionDescriptor } from '../../action-descriptor';

import { ActionDescriptorService } from './action-descriptor.service';

export class DefaultActionDescriptorService implements ActionDescriptorService {
  constructor() {}

  public dispatch(actionDescriptor: ActionDescriptor, store: Store<object>): void {
    if (store && actionDescriptor && actionDescriptor.type && actionDescriptor.type.length) {
      const action: Action = {
        type: actionDescriptor.type,
        ...actionDescriptor.props,
      };
      store.dispatch(action);
    }
  }
}
