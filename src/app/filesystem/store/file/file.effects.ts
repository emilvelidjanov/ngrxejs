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

  public openDirectory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fileActions.openDirectory),
        tap((action) => this.filesystemFacade.openDirectory(action.entity)),
      ),
    { dispatch: false },
  );
}
