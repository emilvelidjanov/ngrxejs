import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';

import { ProjectTrees } from '../../store/project-tree/project-tree.state';

import { DefaultProjectTreeService } from './default-project-tree.service';
import { ProjectTreeService } from './project-tree.service';

export const projectTreeServiceDep: DependencyConfigurer<ProjectTreeService> = new DependencyConfigurer<ProjectTreeService>({
  tokenDescription: 'ProjectTreeService',
  dependencies: [Store],
  factory: (store: Store<ProjectTrees>) => {
    return new DefaultProjectTreeService(store);
  },
});
