import { Observable } from 'rxjs';
import { EntityPartial, Id } from 'src/app/core/ngrx/entity/entity';

import { TabItem } from '../../store/tab-item/tab-item.state';

export interface TabItemService {
  createFromPartial(partial: EntityPartial<TabItem>): TabItem;
  createDefault(): Observable<TabItem>;
  addMany(tabItems: TabItem[]): void;
  removeMany(tabItems: TabItem[]): void;
  select(id: Id): Observable<TabItem>;
  dispatchClickAction(tabItem: TabItem): void;
  dispatchCloseAction(tabItem: TabItem): void;
}
