import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityPartial, Id, IdLessPartial } from 'src/app/core/ngrx/entity/entity';
import { ActionDescriptorService } from 'src/app/core/ngrx/services/action-descriptor-service/action-descriptor.service';
import { actionDescriptorServiceDep } from 'src/app/core/ngrx/services/action-descriptor-service/action-descriptor.service.dependency';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { tabItemActions } from '../../store/tab-item/tab-item.actions';
import { tabItemSelectors } from '../../store/tab-item/tab-item.selectors';
import { TabItem, TabItems } from '../../store/tab-item/tab-item.state';

import { TabItemService } from './tab-item.service';

@Injectable()
export class DefaultTabItemService implements TabItemService {
  private tabItemIds$: Observable<Id[]>;

  constructor(
    private store: Store<TabItems>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
    @Inject(actionDescriptorServiceDep.getToken()) private actionDescriptorService: ActionDescriptorService,
  ) {
    this.tabItemIds$ = this.store.pipe(select(tabItemSelectors.selectIds));
  }

  public selectAll(): Observable<TabItem[]> {
    return this.store.pipe(select(tabItemSelectors.selectAll));
  }

  public removeOne(entity: TabItem): void {
    if (entity) {
      this.store.dispatch(tabItemActions.removeOne({ id: entity.id }));
    }
  }

  public createDefault(partial: EntityPartial<TabItem>): TabItem {
    const tabItem: TabItem = {
      id: null,
      label: null,
      isClosable: false,
      clickAction: null,
      closeAction: null,
      ...partial,
    };
    return tabItem;
  }

  public createOne(partial: IdLessPartial<TabItem>): Observable<TabItem> {
    const tabItem$ = this.tabItemIds$.pipe(
      map((ids: Id[]) => this.idGeneratorService.nextId(ids)),
      map((id: Id) => this.createDefault({ id, ...partial })),
    );
    return tabItem$;
  }

  public createMany(partials: IdLessPartial<TabItem>[]): Observable<TabItem[]> {
    const tabItems$ = this.tabItemIds$.pipe(
      map((ids) => this.idGeneratorService.nextNIds(partials.length, ids)),
      map((ids) => ids.map((id, index) => this.createDefault({ id, ...partials[index] }))),
    );
    return tabItems$;
  }

  public addOne(entity: TabItem): void {
    if (entity) {
      this.store.dispatch(tabItemActions.addOne({ entity }));
    }
  }

  public addMany(entities: TabItem[]): void {
    if (entities && entities.length) {
      this.store.dispatch(tabItemActions.addMany({ entities }));
    }
  }

  public selectOne(id: Id): Observable<TabItem> {
    return this.store.pipe(select(tabItemSelectors.selectEntityById, { id }));
  }

  public selectMany(ids: Id[]): Observable<TabItem[]> {
    return this.store.pipe(select(tabItemSelectors.selectEntitiesByIds, { ids }));
  }

  public removeMany(tabItems: TabItem[]): void {
    if (tabItems && tabItems.length) {
      this.store.dispatch(tabItemActions.removeMany({ ids: tabItems.map((tabItem) => tabItem.id) }));
    }
  }

  public dispatchClickAction(tabItem: TabItem): void {
    this.actionDescriptorService.dispatch(tabItem.clickAction, this.store);
  }

  public dispatchCloseAction(tabItem: TabItem): void {
    this.actionDescriptorService.dispatch(tabItem.closeAction, this.store);
  }
}
