import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { File, Files } from 'src/app/filesystem/store/file/file.state';

import { editorActions } from '../../store/editor/editor.actions';
import { editorSelectors } from '../../store/editor/editor.selectors';

import { EditorService } from './editor.service';

export class DefaultEditorService implements EditorService {
  constructor(private store: Store<Files>) {}

  public dispatchToggleOpenedFile(file: File): void {
    const isOpened$ = this.selectIsOpenedFile(file);
    isOpened$.subscribe((isOpened: boolean) => {
      if (!isOpened) {
        this.dispatchOpenedFile(file);
      }
    });
  }

  public dispatchFocusedFile(file: File): void {
    this.store.dispatch(editorActions.setFocusedId({ id: file.id }));
  }

  public selectIsOpenedFile(file: File): Observable<boolean> {
    return this.store.pipe(select(editorSelectors.selectIsOpenedId, { id: file.id }));
  }

  public dispatchOpenedFile(file: File): void {
    this.store.dispatch(editorActions.addOpenedId({ id: file.id }));
  }
}
