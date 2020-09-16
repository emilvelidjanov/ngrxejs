import { Observable } from 'rxjs';
import { EntityPartial } from 'src/app/core/ngrx/entity/entity';
import { File } from 'src/app/filesystem/store/file/file.state';

import { Editor } from '../../store/editor/editor.state';

export interface EditorFacade {
  addEditorsConfig(partials: EntityPartial<Editor>[]): void;
  onClick(editor: Editor): void;
  selectFocusedEditor(): Observable<Editor>;
  openFile(file: File, editor: Editor): void;
  closeFile(file: File, editor: Editor): void;
  closeFileAllEditors(file: File): void;
}
