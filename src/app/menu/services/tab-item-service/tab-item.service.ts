import { TabItem } from '../../store/tab-item/tab-item.state';

export interface TabItemService {
  addMany(tabItems: TabItem[]): void;
}
