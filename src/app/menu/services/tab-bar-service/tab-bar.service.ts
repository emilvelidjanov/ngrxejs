import { Observable } from 'rxjs';
import { EntityPartial } from 'src/app/core/ngrx/entity/entity';

import { TabBar } from '../../store/tab-bar/tab-bar.state';
import { TabItem } from '../../store/tab-item/tab-item.state';

export interface TabBarService {
  createFromPartial(partial: EntityPartial<TabBar>): TabBar;
  addMany(tabBars: TabBar[]): void;
  select(id: string): Observable<TabBar>;
  addTabItems(tabItems: TabItem[], tabBar: TabBar): void;
}
