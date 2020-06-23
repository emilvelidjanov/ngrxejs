import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { FilesystemFacade } from '../../services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from '../../services/filesystem-facade/filesystem.facade.dependency';

import { directoryActions } from './directory.actions';

@Injectable()
export class DirectoryEffects {
  constructor(
    private actions$: Actions,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
  ) {}

  public openDirectory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(directoryActions.openDirectory),
        tap((action) => this.filesystemFacade.openDirectory(action.entity)),
      ),
    { dispatch: false },
  );

  public openContextMenu$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(directoryActions.openContextMenu),
        tap((action) => this.filesystemFacade.openContextMenu(action.id, action.x, action.y)),
      ),
    { dispatch: false },
  );
}
