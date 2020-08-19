import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, take, tap } from 'rxjs/operators';

import { FilesystemFacade } from '../../services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from '../../services/filesystem-facade/filesystem.facade.dependency';

import { projectTreeActions } from './project-tree.actions';

@Injectable()
export class ProjectTreeEffects {
  constructor(private actions$: Actions, @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade) {}

  public openProject$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(projectTreeActions.openProject),
        switchMap((action) => this.filesystemFacade.selectProjectTree(action.id).pipe(take(1))),
        tap((projectTree) => this.filesystemFacade.openProject(projectTree)),
      ),
    { dispatch: false },
  );
}
