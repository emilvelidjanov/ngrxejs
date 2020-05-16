import { DependencyConfigurer } from '../../../angular/dependency-configurer';

import { IdGeneratorService } from './id-generator.service';
import { NumberIdGeneratorService } from './number-id-generator.service';
import { UuidGeneratorService } from './uuid-generator.service';

export const numberIdGeneratorServiceDep: DependencyConfigurer<IdGeneratorService> = new DependencyConfigurer<
  IdGeneratorService
>({
  tokenDescription: 'NumberIdGeneratorService',
  dependencies: [],
  factory: () => {
    return new NumberIdGeneratorService();
  },
});

export const uuidGeneratorServiceDep: DependencyConfigurer<IdGeneratorService> = new DependencyConfigurer<
  IdGeneratorService
>({
  tokenDescription: 'UuidGeneratorService',
  dependencies: [],
  factory: () => {
    return new UuidGeneratorService();
  },
});
