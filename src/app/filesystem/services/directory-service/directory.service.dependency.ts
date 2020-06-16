import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { SortService } from 'src/app/core/services/sort-service/sort.service';
import { sortServiceDep } from 'src/app/core/services/sort-service/sort.service.dependency';

import { Directories } from '../../store/directory/directory.state';
import { FileService } from '../file-service/file.service';
import { fileServiceDep } from '../file-service/file.service.dependency';

import { DefaultDirectoryService } from './default-directory.service';
import { DirectoryService } from './directory.service';

export const directoryServiceDep: DependencyConfigurer<DirectoryService> = new DependencyConfigurer<DirectoryService>({
  tokenDescription: 'DirectoryService',
  dependencies: [Store, numberIdGeneratorServiceDep.getToken(), sortServiceDep.getToken(), fileServiceDep.getToken()],
  factory: (
    store: Store<Directories>,
    idGeneratorService: IdGeneratorService,
    sortService: SortService,
    fileService: FileService,
  ) => {
    return new DefaultDirectoryService(store, idGeneratorService, sortService, fileService);
  },
});
