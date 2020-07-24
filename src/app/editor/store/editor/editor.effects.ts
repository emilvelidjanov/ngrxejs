import { Inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { EditorFacade } from '../../services/editor-facade/editor.facade';
import { editorFacadeDep } from '../../services/editor-facade/editor.facade.dependency';

@Injectable()
export class EditorEffects {
  constructor(private actions$: Actions, @Inject(editorFacadeDep.getToken()) private editorFacade: EditorFacade) {}
}
