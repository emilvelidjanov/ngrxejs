import { EntityPartial } from 'src/app/core/ngrx/entity/entity';

import { TabBar } from '../../store/tab-bar/tab-bar.state';

export interface TabBarService {
  createFromPartial(partial: EntityPartial<TabBar>): TabBar;
  addMany(tabBars: TabBar[]): void;
}
