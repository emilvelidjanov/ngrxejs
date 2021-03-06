import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { SortService } from 'src/app/core/services/sort-service/sort.service';
import { sortServiceDep } from 'src/app/core/services/sort-service/sort.service.dependency';

import { DirectoryItems } from '../../store/directory-item/directory-item.state';
import { DirectoryService } from '../directory-service/directory.service';
import { directoryServiceDep } from '../directory-service/directory.service.dependency';

import { DefaultDirectoryItemService } from './default-directory-item.service';
import { DirectoryItemService } from './directory-item.service';

export const directoryItemServiceDep: DependencyConfigurer<DirectoryItemService> = new DependencyConfigurer<DirectoryItemService>({
  tokenDescription: 'DirectoryItemService',
  dependencies: [Store, numberIdGeneratorServiceDep.getToken(), sortServiceDep.getToken(), directoryServiceDep.getToken()],
  factory: (store: Store<DirectoryItems>, idGeneratorService: IdGeneratorService, sortService: SortService, directoryService: DirectoryService) => {
    return new DefaultDirectoryItemService(store, idGeneratorService, sortService, directoryService);
  },
});
