import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { FilesystemFacade } from '../../services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from '../../services/filesystem-facade/filesystem.facade.dependency';

import { projectActions } from './project.actions';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
  ) {}

  public openProject$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(projectActions.openProject),
        tap(() => this.filesystemFacade.openProject()),
      ),
    { dispatch: false },
  );
}
