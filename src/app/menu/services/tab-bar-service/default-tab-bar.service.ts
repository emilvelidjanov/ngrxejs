import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityPartial } from 'src/app/core/ngrx/entity/entity';

import { tabBarActions } from '../../store/tab-bar/tab-bar.actions';
import { TabBar, TabBars } from '../../store/tab-bar/tab-bar.state';

import { TabBarService } from './tab-bar.service';

@Injectable()
export class DefaultTabBarService implements TabBarService {
  constructor(private store: Store<TabBars>) {}

  public createFromPartial(partial: EntityPartial<TabBar>): TabBar {
    return {
      tabItemIds: [],
      ...partial,
    } as TabBar;
  }

  public addMany(tabBars: TabBar[]): void {
    if (tabBars && tabBars.length) {
      this.store.dispatch(tabBarActions.addMany({ entities: tabBars }));
    }
  }
}
