import { EntityPartial } from 'src/app/core/ngrx/entity/entity';

import { Editor } from '../../store/editor/editor.state';

export interface EditorService {
  createFromPartial(partial: EntityPartial<Editor>): Editor;
  addMany(editors: Editor[]): void;
  focus(editor: Editor): void;
}
