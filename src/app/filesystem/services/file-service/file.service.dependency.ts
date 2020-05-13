import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { FileService } from './file.service';
import { DefaultFileService } from './default-file.service';
import { Store } from '@ngrx/store';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { Files } from '../../store/file/file.state';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { sortServiceDep } from 'src/app/core/services/sort-service/sort.service.dependency';
import { SortService } from 'src/app/core/services/sort-service/sort.service';


export const fileServiceDep: DependencyConfigurer<FileService> = new DependencyConfigurer<FileService>({
  tokenDescription: 'FileService',
  dependencies: [
    Store,
    numberIdGeneratorServiceDep.getToken(),
    sortServiceDep.getToken(),
  ],
  factory: (
    store: Store<Files>,
    idGeneratorService: IdGeneratorService,
    sortService: SortService,
  ) => {
    return new DefaultFileService(store, idGeneratorService, sortService);
  }
});
