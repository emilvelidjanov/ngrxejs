import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { FilesystemFacade } from 'src/app/filesystem/services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from 'src/app/filesystem/services/filesystem-facade/filesystem.facade.dependency';
import { fileActions } from 'src/app/filesystem/store/file/file.actions';

import { EditorFacade } from '../../services/editor-facade/editor.facade';
import { editorFacadeDep } from '../../services/editor-facade/editor.facade.dependency';

import { editorActions } from './editor.actions';

@Injectable()
export class EditorEffects {
  constructor(
    private actions$: Actions,
    @Inject(editorFacadeDep.getToken()) private editorFacade: EditorFacade,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
  ) {}

  public onClick$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editorActions.onClick),
        tap((action) => this.editorFacade.onClick(action.entity)),
      ),
    { dispatch: false },
  );

  public openFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editorActions.openFile),
        switchMap((action) => this.filesystemFacade.selectFile(action.id).pipe(take(1))),
        withLatestFrom(this.editorFacade.selectFocusedEditor()), // TODO: focused can be wrong here with multiple editors
        tap(([file, editor]) => this.editorFacade.openFile(file, editor)),
      ),
    { dispatch: false },
  );

  public closeFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editorActions.closeFile),
        switchMap((action) => this.filesystemFacade.selectFile(action.id).pipe(take(1))),
        withLatestFrom(this.editorFacade.selectFocusedEditor()), // TODO: focused can be wrong here with multiple editors
        tap(([file, editor]) => this.editorFacade.closeFile(file, editor)),
      ),
    { dispatch: false },
  );

  public closeDeletedFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fileActions.deleted),
        tap((action) => this.editorFacade.closeFileAllEditors(action.entity)),
      ),
    { dispatch: false },
  );

  public syncContentToFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editorActions.syncContentToFile),
        tap((action) => this.filesystemFacade.updateFileContent(action.entity, action.content)),
      ),
    { dispatch: false },
  );

  public updateRenderMode$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editorActions.updateRenderMode),
        withLatestFrom(this.editorFacade.selectFocusedEditor()),
        tap(([action, editor]) => this.editorFacade.updateEditorRenderMode(editor, action.renderMode)),
      ),
    { dispatch: false },
  );
}
