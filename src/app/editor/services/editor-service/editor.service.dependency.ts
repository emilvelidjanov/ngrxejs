import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';

import { DefaultEditorService } from './default-editor.service';
import { EditorService } from './editor.service';

export const editorServiceDep: DependencyConfigurer<EditorService> = new DependencyConfigurer({
  tokenDescription: 'EditorService',
  dependencies: [],
  factory: () => new DefaultEditorService(),
});
