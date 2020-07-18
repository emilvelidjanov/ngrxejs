import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { FilesystemFacade } from '../../services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from '../../services/filesystem-facade/filesystem.facade.dependency';

import { directoryItemActions } from './directory-item.actions';

@Injectable()
export class DirectoryItemEffects {
  constructor(
    private actions$: Actions,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
  ) {}

  public open$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(directoryItemActions.open),
        tap((action) => this.filesystemFacade.openDirectoryItem(action.entity)),
      ),
    { dispatch: false },
  );
}
