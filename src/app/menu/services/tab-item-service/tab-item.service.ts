import { EntityService } from 'src/app/core/ngrx/services/entity.service';

import { TabItem } from '../../store/tab-item/tab-item.state';

export interface TabItemService extends EntityService<TabItem> {
  removeMany(tabItems: TabItem[]): void;
  dispatchClickAction(tabItem: TabItem): void;
  dispatchCloseAction(tabItem: TabItem): void;
}
