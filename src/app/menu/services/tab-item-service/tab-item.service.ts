import { Observable } from 'rxjs';
import { EntityPartial } from 'src/app/core/ngrx/entity/entity';

import { TabItem } from '../../store/tab-item/tab-item.state';

export interface TabItemService {
  createFromPartial(partial: EntityPartial<TabItem>): TabItem;
  createDefault(): Observable<TabItem>;
  addMany(tabItems: TabItem[]): void;
  dispatchClickAction(tabItem: TabItem): void;
}
