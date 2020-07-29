import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';

import { TabBars } from '../../store/tab-bar/tab-bar.state';

import { DefaultTabBarService } from './default-tab-bar.service';
import { TabBarService } from './tab-bar.service';

export const tabBarServiceDep: DependencyConfigurer<TabBarService> = new DependencyConfigurer<TabBarService>({
  tokenDescription: 'TabBarService',
  dependencies: [Store],
  factory: (store: Store<TabBars>) => {
    return new DefaultTabBarService(store);
  },
});
