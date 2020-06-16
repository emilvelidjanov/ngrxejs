import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { Files } from 'src/app/filesystem/store/file/file.state';

import { DefaultEditorService } from './default-editor.service';
import { EditorService } from './editor.service';

export const editorServiceDep: DependencyConfigurer<EditorService> = new DependencyConfigurer({
  tokenDescription: 'EditorService',
  dependencies: [Store],
  factory: (store: Store<Files>) => new DefaultEditorService(store),
});
