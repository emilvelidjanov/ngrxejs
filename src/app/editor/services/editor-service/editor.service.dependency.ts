import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { IdGeneratorService } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service';
import { uuidGeneratorServiceDep } from 'src/app/core/ngrx/services/id-generator-service/id-generator.service.dependency';

import { Editors } from '../../store/editor/editor.state';

import { DefaultEditorService } from './default-editor.service';
import { EditorService } from './editor.service';

export const editorServiceDep: DependencyConfigurer<EditorService> = new DependencyConfigurer({
  tokenDescription: 'EditorService',
  dependencies: [Store, uuidGeneratorServiceDep.getToken()],
  factory: (store: Store<Editors>, idGeneratorService: IdGeneratorService) => new DefaultEditorService(store, idGeneratorService),
});
