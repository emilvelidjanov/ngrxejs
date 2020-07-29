import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EditorFacade } from 'src/app/editor/services/editor-facade/editor.facade';
import { editorFacadeDep } from 'src/app/editor/services/editor-facade/editor.facade.dependency';

import { fileItemActions } from './file-item.actions';

@Injectable()
export class FileItemEffects {
  constructor(private actions$: Actions, @Inject(editorFacadeDep.getToken()) private editorFacade: EditorFacade) {}

  public onClick$ = createEffect(() => this.actions$.pipe(ofType(fileItemActions.onClick)), { dispatch: false });
}
