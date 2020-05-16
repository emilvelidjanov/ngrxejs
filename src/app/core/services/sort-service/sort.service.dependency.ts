import { DependencyConfigurer } from '../../angular/dependency-configurer';

import { DefaultSortService } from './default-sort.service';
import { SortService } from './sort.service';

export const sortServiceDep: DependencyConfigurer<SortService> = new DependencyConfigurer<SortService>({
  tokenDescription: 'SortService',
  dependencies: [],
  factory: () => {
    return new DefaultSortService();
  },
});
