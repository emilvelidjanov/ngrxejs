import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { ProjectService } from './project.service';
import { DefaultProjectService } from './default-project.service';


export const projectServiceDep: DependencyConfigurer<ProjectService> = new DependencyConfigurer<ProjectService>({
  tokenDescription: 'ProjectService',
  dependencies: [],
  factory: () => {
    return new DefaultProjectService();
  }
});