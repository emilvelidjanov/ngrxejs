import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';

import { tabBarActions } from '../../store/tab-bar/tab-bar.actions';
import { tabBarSelectors } from '../../store/tab-bar/tab-bar.selectors';
import { TabBar, TabBars } from '../../store/tab-bar/tab-bar.state';
import { TabItem } from '../../store/tab-item/tab-item.state';

import { TabBarService } from './tab-bar.service';

@Injectable()
export class DefaultTabBarService implements TabBarService {
  constructor(private store: Store<TabBars>) {}

  public createFromPartial(partial: EntityPartial<TabBar>): TabBar {
    const tabBar: TabBar = {
      tabItemIds: [],
      ...partial,
    };
    return tabBar;
  }

  public addMany(tabBars: TabBar[]): void {
    if (tabBars && tabBars.length) {
      this.store.dispatch(tabBarActions.addMany({ entities: tabBars }));
    }
  }

  public select(id: Id): Observable<TabBar> {
    return this.store.pipe(select(tabBarSelectors.selectEntityById, { id }));
  }

  public addTabItems(tabItems: TabItem[], tabBar: TabBar): void {
    if (tabBar && tabItems) {
      const toAdd = tabItems.filter((tabItem) => !tabBar.tabItemIds.includes(tabItem.id));
      if (toAdd.length) {
        this.store.dispatch(
          tabBarActions.updateOne({
            update: {
              id: tabBar.id,
              changes: {
                tabItemIds: [...tabBar.tabItemIds, ...toAdd.map((tabItem) => tabItem.id)],
              },
            },
          }),
        );
      }
    }
  }

  public removeTabItems(tabItems: TabItem[], tabBar: TabBar): void {
    if (tabBar && tabItems) {
      const toRemove = tabItems
        .filter((tabItem) => tabBar.tabItemIds.includes(tabItem.id))
        .map((tabItem) => tabItem.id);
      if (toRemove.length) {
        this.store.dispatch(
          tabBarActions.updateOne({
            update: {
              id: tabBar.id,
              changes: {
                tabItemIds: tabBar.tabItemIds.filter((id) => !toRemove.includes(id)),
              },
            },
          }),
        );
      }
    }
  }
}
