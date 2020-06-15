import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { EditorFacade } from '../../services/editor-facade/editor.facade';
import { editorFacadeDep } from '../../services/editor-facade/editor.facade.dependency';

import { editorActions } from './editor.actions';

@Injectable()
export class EditorEffects {
  constructor(private actions$: Actions, @Inject(editorFacadeDep.getToken()) private editorFacade: EditorFacade) {}

  public openFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editorActions.openFile),
        tap((action) => this.editorFacade.openFile(action.entity)),
      ),
    { dispatch: false },
  );
}
