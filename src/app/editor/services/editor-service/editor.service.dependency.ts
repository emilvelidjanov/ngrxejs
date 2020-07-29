import { Store } from '@ngrx/store';
import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';

import { Editors } from '../../store/editor/editor.state';

import { DefaultEditorService } from './default-editor.service';
import { EditorService } from './editor.service';

export const editorServiceDep: DependencyConfigurer<EditorService> = new DependencyConfigurer({
  tokenDescription: 'EditorService',
  dependencies: [Store],
  factory: (store: Store<Editors>) => new DefaultEditorService(store),
});
