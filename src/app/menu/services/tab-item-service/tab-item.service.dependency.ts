import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';

import { TabItems } from '../../store/tab-item/tab-item.state';

import { DefaultTabItemService } from './default-tab-item.service';
import { TabItemService } from './tab-item.service';

export const tabItemServiceDep: DependencyConfigurer<TabItemService> = new DependencyConfigurer<TabItemService>({
  tokenDescription: 'TabItemService',
  dependencies: [Store],
  factory: (store: Store<TabItems>) => {
    return new DefaultTabItemService(store);
  },
});
