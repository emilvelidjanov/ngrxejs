import { Injectable, Inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { filesystemFacadeDep } from '../../services/filesystem-facade/filesystem.facade.dependency';
import { FilesystemFacade } from '../../services/filesystem-facade/filesystem.facade';
import { projectActions } from './project.actions';
import { tap } from 'rxjs/operators';


@Injectable()
export class ProjectEffects {

  constructor(
    private actions$: Actions,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
  ) { }

  openProject$ = createEffect(() => this.actions$.pipe(
    ofType(projectActions.openProject),
    tap(() => this.filesystemFacade.openProject()),
  ), { dispatch: false });
}