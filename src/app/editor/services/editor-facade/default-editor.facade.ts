import { Inject } from '@angular/core';
import { EntityPartial } from 'src/app/core/ngrx/entity/entity';
import { FilesystemFacade } from 'src/app/filesystem/services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from 'src/app/filesystem/services/filesystem-facade/filesystem.facade.dependency';
import { File } from 'src/app/filesystem/store/file/file.state';

import { Editor } from '../../store/editor/editor.state';
import { EditorService } from '../editor-service/editor.service';
import { editorServiceDep } from '../editor-service/editor.service.dependency';

import { EditorFacade } from './editor.facade';

export class DefaultEditorFacade implements EditorFacade {
  constructor(
    @Inject(editorServiceDep.getToken()) private editorService: EditorService,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
  ) {}

  public addEditorsConfig(partials: EntityPartial<Editor>[]): void {
    const editors = partials.map((partial) => this.editorService.createFromPartial(partial));
    this.editorService.addMany(editors);
  }

  public onClick(editor: Editor): void {
    this.editorService.focus(editor);
  }

  public selectFocusedEditor(): Editor {
    throw new Error('Method not implemented.');
  }

  public openFile(file: File, editor: Editor): void {
    throw new Error('Method not implemented.');
  }
}
