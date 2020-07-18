import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { DirectoryItems } from '../../store/directory-item/directory-item.state';

import { DefaultDirectoryItemService } from './default-directory.service';
import { DirectoryItemService } from './directory.service';

export const directoryItemServiceDep: DependencyConfigurer<DirectoryItemService> = new DependencyConfigurer<
  DirectoryItemService
>({
  tokenDescription: 'DirectoryItemService',
  dependencies: [Store, numberIdGeneratorServiceDep.getToken()],
  factory: (store: Store<DirectoryItems>, idGeneratorService: IdGeneratorService) => {
    return new DefaultDirectoryItemService(store, idGeneratorService);
  },
});
