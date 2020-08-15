import { DependencyConfigurer } from '../../angular/dependency-configurer';

import { DefaultEqualityService } from './default-equality.service';
import { EqualityService } from './equality.service';

export const equalityServiceDep: DependencyConfigurer<DefaultEqualityService> = new DependencyConfigurer<
  EqualityService
>({
  tokenDescription: 'EqualityService',
  dependencies: [],
  factory: () => {
    return new DefaultEqualityService();
  },
});
