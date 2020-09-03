import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { uuidGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { TabBars } from '../../store/tab-bar/tab-bar.state';

import { DefaultTabBarService } from './default-tab-bar.service';
import { TabBarService } from './tab-bar.service';

export const tabBarServiceDep: DependencyConfigurer<TabBarService> = new DependencyConfigurer<TabBarService>({
  tokenDescription: 'TabBarService',
  dependencies: [Store, uuidGeneratorServiceDep.getToken()],
  factory: (store: Store<TabBars>, idGeneratorService: IdGeneratorService) => {
    return new DefaultTabBarService(store, idGeneratorService);
  },
});
