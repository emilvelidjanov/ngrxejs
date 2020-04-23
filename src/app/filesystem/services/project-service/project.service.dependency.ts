import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { ProjectService } from './project.service';
import { DefaultProjectService } from './default-project.service';
import { Store } from '@ngrx/store';
import { numberIdGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { Projects } from '../../store/project/project.state';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';


export const projectServiceDep: DependencyConfigurer<ProjectService> = new DependencyConfigurer<ProjectService>({
  tokenDescription: 'ProjectService',
  dependencies: [
    Store,
    numberIdGeneratorServiceDep.getToken(),
  ],
  factory: (
    store: Store<Projects>,
    idGeneratorService: IdGeneratorService,
  ) => {
    return new DefaultProjectService(store, idGeneratorService);
  }
});