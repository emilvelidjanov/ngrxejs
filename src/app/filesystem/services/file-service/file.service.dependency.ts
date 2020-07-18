import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { sortServiceDep } from 'src/app/core/services/sort-service/sort.service.dependency';

import { Files } from '../../store/file/file.state';

import { DefaultFileService } from './default-file.service';
import { FileService } from './file.service';

export const fileServiceDep: DependencyConfigurer<FileService> = new DependencyConfigurer<FileService>({
  tokenDescription: 'FileService',
  dependencies: [Store, numberIdGeneratorServiceDep.getToken(), sortServiceDep.getToken()],
  factory: (store: Store<Files>, idGeneratorService: IdGeneratorService) => {
    return new DefaultFileService(store, idGeneratorService);
  },
});
