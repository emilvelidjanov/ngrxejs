import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { DomService } from 'src/app/core/services/DOM-service/dom.service';
import { domServiceDep } from 'src/app/core/services/DOM-service/dom.service.dependency';

import { EventStrategy } from './event.strategy';
import { FirstParagraphEventStrategy } from './first-paragraph-event.strategy';

export const keyboardEventStrategiesDep: DependencyConfigurer<EventStrategy[]> = new DependencyConfigurer({
  tokenDescription: 'KeydownEventStrategies',
  dependencies: [domServiceDep.getToken()],
  factory: (domService: DomService) => [new FirstParagraphEventStrategy(domService)],
});

export const inputEventStrategiesDep: DependencyConfigurer<EventStrategy[]> = new DependencyConfigurer({
  tokenDescription: 'InputEventStrategies',
  dependencies: [domServiceDep.getToken()],
  factory: (_domService: DomService) => [],
});
