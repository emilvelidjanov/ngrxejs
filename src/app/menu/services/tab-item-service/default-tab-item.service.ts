import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { tabItemActions } from '../../store/tab-item/tab-item.actions';
import { TabItem, TabItems } from '../../store/tab-item/tab-item.state';

import { TabItemService } from './tab-item.service';

@Injectable()
export class DefaultTabItemService implements TabItemService {
  constructor(private store: Store<TabItems>) {}

  public addMany(tabItems: TabItem[]): void {
    if (tabItems && tabItems.length) {
      this.store.dispatch(tabItemActions.addMany({ entities: tabItems }));
    }
  }
}
