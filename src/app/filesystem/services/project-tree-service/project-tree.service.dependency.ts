import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { uuidGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { ProjectTrees } from '../../store/project-tree/project-tree.state';

import { DefaultProjectTreeService } from './default-project-tree.service';
import { ProjectTreeService } from './project-tree.service';

export const projectTreeServiceDep: DependencyConfigurer<ProjectTreeService> = new DependencyConfigurer<ProjectTreeService>({
  tokenDescription: 'ProjectTreeService',
  dependencies: [Store, uuidGeneratorServiceDep.getToken()],
  factory: (store: Store<ProjectTrees>, idGeneratorService: IdGeneratorService) => {
    return new DefaultProjectTreeService(store, idGeneratorService);
  },
});
