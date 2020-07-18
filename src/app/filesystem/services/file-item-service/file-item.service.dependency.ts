import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { FileItems } from '../../store/file-item/file-item.state';

import { DefaultFileItemService } from './default-file-item.service';
import { FileItemService } from './file-item.service';

export const fileItemServiceDep: DependencyConfigurer<FileItemService> = new DependencyConfigurer<FileItemService>({
  tokenDescription: 'FileItemService',
  dependencies: [Store, numberIdGeneratorServiceDep.getToken()],
  factory: (store: Store<FileItems>, idGeneratorService: IdGeneratorService) => {
    return new DefaultFileItemService(store, idGeneratorService);
  },
});
