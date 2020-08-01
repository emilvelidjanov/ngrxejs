import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityPartial } from 'src/app/core/ngrx/entity/entity';
import { File } from 'src/app/filesystem/store/file/file.state';
import { TabItem } from 'src/app/menu/store/tab-item/tab-item.state';

import { editorActions } from '../../store/editor/editor.actions';
import { editorSelectors } from '../../store/editor/editor.selectors';
import { Editor, Editors } from '../../store/editor/editor.state';

import { EditorService } from './editor.service';

export class DefaultEditorService implements EditorService {
  constructor(private store: Store<Editors>) {}

  public createFromPartial(partial: EntityPartial<Editor>): Editor {
    const editor: Editor = {
      focusedFileId: null,
      openedFileIds: [],
      isFocused: false,
      tabBarId: null,
      ...partial,
    };
    return editor;
  }

  public addMany(editors: Editor[]): void {
    if (editors && editors.length) {
      this.store.dispatch(editorActions.addMany({ entities: editors }));
    }
  }

  public focus(editor: Editor): void {
    if (!editor.isFocused) {
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

  public selectFocused(): Observable<Editor> {
    return this.store.pipe(
      select(editorSelectors.selectAll),
      map((editors) => editors.filter((editor) => editor.isFocused)[0]),
    );
  }

  public isOpenedFile(file: File, editor: Editor): boolean {
    return editor.openedFileIds.includes(file.id);
  }

  public addOpenedFiles(files: File[], editor: Editor): void {
    if (files) {
      const toAdd = files.filter((file) => !this.isOpenedFile(file, editor));
      if (toAdd.length) {
        this.store.dispatch(
          editorActions.updateOne({
            update: {
              id: editor.id,
              changes: {
                openedFileIds: [...editor.openedFileIds, ...toAdd.map((file) => file.id)],
              },
            },
          }),
        );
      }
    }
  }

  public focusFile(file: File, editor: Editor): void {
    if (editor.focusedFileId !== file.id) {
      this.store.dispatch(
        editorActions.updateOne({
          update: {
            id: editor.id,
            changes: {
              focusedFileId: file.id,
            },
          },
        }),
      );
    }
  }

  public mapToTabItem(tabItem: TabItem, file: File): TabItem {
    const newTabItem: TabItem = {
      ...tabItem,
      label: file.name + file.extension,
      isClosable: true,
      clickAction: {
        type: editorActions.openFile.type,
        props: {
          id: file.id,
        },
      },
    };
    return newTabItem;
  }
}
