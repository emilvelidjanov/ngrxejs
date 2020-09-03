import { EntityService } from 'src/app/core/ngrx/services/entity.service';

import { TabBar } from '../../store/tab-bar/tab-bar.state';
import { TabItem } from '../../store/tab-item/tab-item.state';

export interface TabBarService extends EntityService<TabBar> {
  addTabItems(tabItems: TabItem[], tabBar: TabBar): void;
  removeTabItems(tabItems: TabItem[], tabBar: TabBar): void;
}
