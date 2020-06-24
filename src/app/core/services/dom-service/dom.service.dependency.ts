import { DependencyConfigurer } from '../../angular/dependency-configurer';

import { DefaultDomService } from './default-dom.service';
import { DomService } from './dom.service';

export const domServiceDep: DependencyConfigurer<DomService> = new DependencyConfigurer<DomService>({
  tokenDescription: 'DomService',
  dependencies: [],
  factory: () => {
    return new DefaultDomService();
  },
});
