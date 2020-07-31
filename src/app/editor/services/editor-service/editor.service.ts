import { Observable } from 'rxjs';
import { EntityPartial } from 'src/app/core/ngrx/entity/entity';
import { File } from 'src/app/filesystem/store/file/file.state';

import { Editor } from '../../store/editor/editor.state';

export interface EditorService {
  isOpenedFile(file: File, editor: Editor): boolean;
  createFromPartial(partial: EntityPartial<Editor>): Editor;
  addMany(editors: Editor[]): void;
  focus(editor: Editor): void;
  selectFocused(): Observable<Editor>;
  addOpenedFiles(files: File[], editor: Editor): void;
  focusFile(file: File, editor: Editor): void;
}
