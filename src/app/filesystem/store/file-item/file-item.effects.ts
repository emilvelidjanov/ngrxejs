import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { EditorFacade } from 'src/app/editor/services/editor-facade/editor.facade';
import { editorFacadeDep } from 'src/app/editor/services/editor-facade/editor.facade.dependency';

import { FilesystemFacade } from '../../services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from '../../services/filesystem-facade/filesystem.facade.dependency';

import { fileItemActions } from './file-item.actions';

@Injectable()
export class FileItemEffects {
  constructor(
    private actions$: Actions,
    @Inject(editorFacadeDep.getToken()) private editorFacade: EditorFacade,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
  ) {}

  public onClick$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fileItemActions.onClick),
        switchMap((action) => this.filesystemFacade.selectFile(action.entity.fileId).pipe(take(1))),
        withLatestFrom(this.editorFacade.selectFocusedEditor()),
        tap(([file, editor]) => this.editorFacade.openFile(file, editor)),
      ),
    { dispatch: false },
  );

  public delete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fileItemActions.delete),
        switchMap((action) => this.filesystemFacade.selectFileItem(action.id).pipe(take(1))),
        switchMap((fileItem) => this.filesystemFacade.selectFile(fileItem.fileId).pipe(take(1))),
        tap((file) => this.filesystemFacade.deleteFile(file)),
      ),
    { dispatch: false },
  );
}
