import { Observable } from 'rxjs';
import { EntityService } from 'src/app/core/ngrx/services/entity.service';
import { File } from 'src/app/filesystem/store/file/file.state';
import { TabItem } from 'src/app/menu/store/tab-item/tab-item.state';

import { Editor } from '../../store/editor/editor.state';

export interface EditorService extends EntityService<Editor> {
  isOpenedFile(file: File, editor: Editor): boolean;
  focus(editor: Editor): void;
  selectFocused(): Observable<Editor>;
  addOpenedFiles(files: File[], editor: Editor): void;
  focusFile(file: File, editor: Editor): void;
  mapToTabItem(tabItem: TabItem, file: File): TabItem;
  getOpenedFileIndex(file: File, editor: Editor): number;
  removeOpenedFiles(files: File[], editor: Editor): void;
}
