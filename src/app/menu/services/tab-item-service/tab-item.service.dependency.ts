import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { TabItems } from '../../store/tab-item/tab-item.state';

import { DefaultTabItemService } from './default-tab-item.service';
import { TabItemService } from './tab-item.service';

export const tabItemServiceDep: DependencyConfigurer<TabItemService> = new DependencyConfigurer<TabItemService>({
  tokenDescription: 'TabItemService',
  dependencies: [Store, numberIdGeneratorServiceDep.getToken()],
  factory: (store: Store<TabItems>, idGeneratorService: IdGeneratorService) => {
    return new DefaultTabItemService(store, idGeneratorService);
  },
});
