import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { Directories } from '../../store/directory/directory.state';

import { DefaultDirectoryService } from './default-directory.service';
import { DirectoryService } from './directory.service';

export const directoryServiceDep: DependencyConfigurer<DirectoryService> = new DependencyConfigurer<DirectoryService>({
  tokenDescription: 'DirectoryService',
  dependencies: [Store, numberIdGeneratorServiceDep.getToken()],
  factory: (store: Store<Directories>, idGeneratorService: IdGeneratorService) => {
    return new DefaultDirectoryService(store, idGeneratorService);
  },
});
