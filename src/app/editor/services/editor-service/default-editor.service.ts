import { select, Store } from '@ngrx/store';
import { switchMap, take, takeWhile } from 'rxjs/operators';
import { File, Files } from 'src/app/filesystem/store/file/file.state';

import { editorActions } from '../../store/editor/editor.actions';
import { editorSelectors } from '../../store/editor/editor.selectors';
import { editorAppStateConfig } from '../../store/editor/editor.state';

import { EditorService } from './editor.service';

export class DefaultEditorService implements EditorService {
  constructor(private store: Store<Files>) {}

  public dispatchToggleOpenedFile(file: File): void {
    const isOpened$ = this.store.pipe(
      select(editorSelectors.selectIsOpenedId, { id: file.id }),
      takeWhile((isOpened: boolean) => !isOpened),
      take(1),
    );
    isOpened$.subscribe(() => {
      this.store.dispatch(editorActions.addOpenedId({ id: file.id }));
    });
  }

  public dispatchFocusedFile(file: File): void {
    this.store.dispatch(editorActions.setFocusedId({ id: file.id }));
  }

  public dispatchUnfocusedFile(file: File): void {
    const isFocused$ = this.store.pipe(
      select(editorSelectors.selectIsFocusedId, { id: file.id }),
      takeWhile((isFocused: boolean) => isFocused),
    );
    const openedFiles$ = isFocused$.pipe(
      switchMap(() => this.store.pipe(select(editorSelectors.selectOpenedEntities))),
      take(1),
    );
    openedFiles$.subscribe((files: File[]) => {
      if (files.length > 1) {
        const indexOf: number = files.indexOf(file);
        files.splice(indexOf, 1);
        const neighbor: File = files[indexOf] ? files[indexOf] : files[indexOf - 1];
        this.dispatchFocusedFile(neighbor);
      } else {
        const initialFocusedId = editorAppStateConfig.getInitialState().focusedId;
        this.store.dispatch(editorActions.setFocusedId({ id: initialFocusedId }));
      }
    });
  }

  public dispatchClosedFile(file: File): void {
    this.store.dispatch(editorActions.removeOpenedId({ id: file.id }));
  }
}
