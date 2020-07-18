import { Inject } from '@angular/core';
import { FilesystemFacade } from 'src/app/filesystem/services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from 'src/app/filesystem/services/filesystem-facade/filesystem.facade.dependency';
import { File } from 'src/app/filesystem/store/file/file.state';

import { EditorService } from '../editor-service/editor.service';
import { editorServiceDep } from '../editor-service/editor.service.dependency';

import { EditorFacade } from './editor.facade';

export class DefaultEditorFacade implements EditorFacade {
  constructor(
    @Inject(editorServiceDep.getToken()) private editorService: EditorService,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
  ) {}

  public openFile(file: File): void {
    this.filesystemFacade.loadFile(file);
    this.editorService.open(file);
    this.editorService.focus(file);
  }

  public closeFile(file: File): void {
    this.editorService.unfocus(file);
    this.editorService.close(file);
  }
}
