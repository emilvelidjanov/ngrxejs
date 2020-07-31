import { DependencyConfigurer } from 'src/app/core/angular/dependency-configurer';
import { FilesystemFacade } from 'src/app/filesystem/services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from 'src/app/filesystem/services/filesystem-facade/filesystem.facade.dependency';
import { MenuFacade } from 'src/app/menu/services/menu-facade/menu.facade';
import { menuFacadeDep } from 'src/app/menu/services/menu-facade/menu.facade.dependency';

import { EditorService } from '../editor-service/editor.service';
import { editorServiceDep } from '../editor-service/editor.service.dependency';

import { DefaultEditorFacade } from './default-editor.facade';
import { EditorFacade } from './editor.facade';

export const editorFacadeDep: DependencyConfigurer<EditorFacade> = new DependencyConfigurer({
  tokenDescription: 'EditorFacade',
  dependencies: [editorServiceDep.getToken(), filesystemFacadeDep.getToken(), menuFacadeDep.getToken()],
  factory: (editorService: EditorService, filesystemFacade: FilesystemFacade, menuFacade: MenuFacade) =>
    new DefaultEditorFacade(editorService, filesystemFacade, menuFacade),
});
