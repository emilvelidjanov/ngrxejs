import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { uuidGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';
import { DomService } from 'src/app/core/services/DOM-service/dom.service';
import { domServiceDep } from 'src/app/core/services/DOM-service/dom.service.dependency';

import { EventStrategy } from '../event-strategy/event.strategy';
import { inputEventStrategiesDep, keyboardEventStrategiesDep } from '../event-strategy/event.strategy.dependency';

import { DefaultEditorViewService } from './default-editor-view.service';
import { EditorViewService } from './editor-view.service';

export const editorViewServiceDep: DependencyConfigurer<EditorViewService> = new DependencyConfigurer({
  tokenDescription: 'EditorViewService',
  dependencies: [domServiceDep.getToken(), keyboardEventStrategiesDep.getToken(), inputEventStrategiesDep.getToken()],
  factory: (domService: DomService, keyboardEventStrategies: EventStrategy[], inputEventStategies: EventStrategy[]) =>
    new DefaultEditorViewService(domService, keyboardEventStrategies, inputEventStategies),
});
