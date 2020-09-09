import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { EntityPartial, Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { uuidGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { tabBarActions } from '../../store/tab-bar/tab-bar.actions';
import { tabBarSelectors } from '../../store/tab-bar/tab-bar.selectors';
import { TabBar, TabBars } from '../../store/tab-bar/tab-bar.state';
import { TabItem } from '../../store/tab-item/tab-item.state';

import { TabBarService } from './tab-bar.service';

@Injectable()
export class DefaultTabBarService implements TabBarService {
  constructor(private store: Store<TabBars>, @Inject(uuidGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService) {}

  public removeOne(entity: TabBar): void {
    if (entity) {
      this.store.dispatch(tabBarActions.removeOne({ id: entity.id }));
    }
  }

  public removeMany(entities: TabBar[]): void {
    if (entities && entities.length) {
      const ids = entities.map((entity) => entity.id);
      this.store.dispatch(tabBarActions.removeMany({ ids }));
    }
  }

  public createDefault(partial: EntityPartial<TabBar>): TabBar {
    const tabBar: TabBar = {
      id: null,
      tabItemIds: [],
      ...partial,
    };
    return tabBar;
  }

  public createOne(partial: IdLessPartial<TabBar>): Observable<TabBar> {
    const uuid = this.idGeneratorService.nextId();
    return of(this.createDefault({ id: uuid, ...partial }));
  }

  public createMany(partials: IdLessPartial<TabBar>[]): Observable<TabBar[]> {
    const uuids = this.idGeneratorService.nextNIds(partials.length);
    const entities = uuids.map((uuid, index) => {
      const partial = partials[index];
      return this.createDefault({ id: uuid, ...partial });
    });
    return of(entities);
  }

  public addOne(entity: TabBar): void {
    if (entity) {
      this.store.dispatch(tabBarActions.addOne({ entity }));
    }
  }

  public addMany(entities: TabBar[]): void {
    if (entities && entities.length) {
      this.store.dispatch(tabBarActions.addMany({ entities }));
    }
  }

  public selectOne(id: Id): Observable<TabBar> {
    return this.store.pipe(select(tabBarSelectors.selectEntityById, { id }));
  }

  public selectMany(ids: Id[]): Observable<TabBar[]> {
    return this.store.pipe(select(tabBarSelectors.selectEntitiesByIds, { ids }));
  }

  public addTabItems(tabItems: TabItem[], tabBar: TabBar): void {
    if (tabBar && tabItems && tabItems.length) {
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
    if (tabBar && tabItems && tabItems.length) {
      const toRemove = tabItems.filter((tabItem) => tabBar.tabItemIds.includes(tabItem.id)).map((tabItem) => tabItem.id);
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
