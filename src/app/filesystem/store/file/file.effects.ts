import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { FilesystemFacade } from '../../services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from '../../services/filesystem-facade/filesystem.facade.dependency';

import { fileActions } from './file.actions';

@Injectable()
export class FileEffects {
  constructor(
    private actions$: Actions,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
  ) {}

  public openContextMenu$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fileActions.openContextMenu),
        tap((action) => this.filesystemFacade.openContextMenu(action.id, action.x, action.y)),
      ),
    { dispatch: false },
  );
}
