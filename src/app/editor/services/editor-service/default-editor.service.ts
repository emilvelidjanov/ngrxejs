import { Store } from '@ngrx/store';
import { EntityPartial } from 'src/app/core/ngrx/entity/entity';

import { editorActions } from '../../store/editor/editor.actions';
import { Editor, Editors } from '../../store/editor/editor.state';

import { EditorService } from './editor.service';

export class DefaultEditorService implements EditorService {
  constructor(private store: Store<Editors>) {}

  public createFromPartial(partial: EntityPartial<Editor>): Editor {
    return {
      isFocused: false,
      tabBarId: null,
      ...partial,
    } as Editor;
  }

  public addMany(editors: Editor[]): void {
    if (editors && editors.length) {
      this.store.dispatch(editorActions.addMany({ entities: editors }));
    }
  }

  public focus(editor: Editor): void {
    if (!editor.isFocused) {
      // TODO: define bool toggle action for entities?
      this.store.dispatch(
        editorActions.updateAll({
          partial: {
            isFocused: false,
          },
        }),
      );
      this.store.dispatch(
        editorActions.updateOne({
          update: {
            id: editor.id,
            changes: {
              isFocused: true,
            },
          },
        }),
      );
    }
  }
}
