import { DependencyConfigurer } from '../../../angular/dependency-configurer';

import { ActionDescriptorService } from './action-descriptor.service';
import { DefaultActionDescriptorService } from './default-action-descriptor.service';

export const actionDescriptorServiceDep: DependencyConfigurer<ActionDescriptorService> = new DependencyConfigurer<
  ActionDescriptorService
>({
  tokenDescription: 'ActionDescriptorService',
  dependencies: [],
  factory: () => {
    return new DefaultActionDescriptorService();
  },
});
