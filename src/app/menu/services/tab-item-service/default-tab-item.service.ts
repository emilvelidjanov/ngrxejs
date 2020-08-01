import { Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';
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
  private tabItemIds: Observable<Id[]>;

  constructor(
    private store: Store<TabItems>,
    @Inject(numberIdGeneratorServiceDep.getToken()) private idGeneratorService: IdGeneratorService,
    @Inject(actionDescriptorServiceDep.getToken()) private actionDescriptorService: ActionDescriptorService,
  ) {
    this.tabItemIds = this.store.pipe(select(tabItemSelectors.selectIds));
  }

  public createFromPartial(partial: EntityPartial<TabItem>): TabItem {
    const tabItem: TabItem = {
      label: null,
      isClosable: false,
      clickAction: null,
      ...partial,
    };
    return tabItem;
  }

  public createDefault(): Observable<TabItem> {
    const tabItem$ = this.tabItemIds.pipe(
      map((ids: Id[]) => this.idGeneratorService.nextId(ids)),
      map((id: Id) => this.createFromPartial({ id })),
    );
    return tabItem$;
  }

  public addMany(tabItems: TabItem[]): void {
    if (tabItems && tabItems.length) {
      this.store.dispatch(tabItemActions.addMany({ entities: tabItems }));
    }
  }

  public dispatchClickAction(tabItem: TabItem): void {
    this.actionDescriptorService.dispatch(tabItem.clickAction, this.store);
  }
}
