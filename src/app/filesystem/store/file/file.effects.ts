import { Injectable, Inject } from "@angular/core";
import { FilesystemFacade } from '../../services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from '../../services/filesystem-facade/filesystem.facade.dependency';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fileActions } from './file.actions';
import { tap } from 'rxjs/operators';


@Injectable()
export class FileEffects {

  constructor(
    private actions$: Actions,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
  ) { }

  openDirectory$ = createEffect(() => this.actions$.pipe(
    ofType(fileActions.openDirectory),
    tap((action) => this.filesystemFacade.openDirectory(action.entity)),
  ), { dispatch: false });
}