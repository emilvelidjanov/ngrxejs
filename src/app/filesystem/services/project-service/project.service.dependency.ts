import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { Projects } from '../../store/project/project.state';
import { DirectoryService } from '../directory-service/directory.service';
import { directoryServiceDep } from '../directory-service/directory.service.dependency';
import { FileService } from '../file-service/file.service';
import { fileServiceDep } from '../file-service/file.service.dependency';

import { DefaultProjectService } from './default-project.service';
import { ProjectService } from './project.service';

export const projectServiceDep: DependencyConfigurer<ProjectService> = new DependencyConfigurer<ProjectService>({
  tokenDescription: 'ProjectService',
  dependencies: [
    Store,
    fileServiceDep.getToken(),
    directoryServiceDep.getToken(),
    numberIdGeneratorServiceDep.getToken(),
  ],
  factory: (
    store: Store<Projects>,
    fileService: FileService,
    directoryService: DirectoryService,
    idGeneratorService: IdGeneratorService,
  ) => {
    return new DefaultProjectService(store, fileService, directoryService, idGeneratorService);
  },
});
