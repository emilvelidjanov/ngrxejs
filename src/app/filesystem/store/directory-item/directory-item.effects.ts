import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { FilesystemFacade } from '../../services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from '../../services/filesystem-facade/filesystem.facade.dependency';

import { directoryItemActions } from './directory-item.actions';

@Injectable()
export class DirectoryItemEffects {
  constructor(private actions$: Actions, @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade) {}

  public open$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(directoryItemActions.open),
        tap((action) => this.filesystemFacade.openDirectoryItem(action.entity)),
      ),
    { dispatch: false },
  );

  public showCreateNewInput$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(directoryItemActions.showCreateNewInput),
        switchMap((action) => forkJoin([this.filesystemFacade.selectDirectoryItem(action.id).pipe(take(1)), of(action.createNewInputType)])),
        tap(([directoryItem, createNewInputType]) => this.filesystemFacade.showCreateNewInputDirectoryItem(directoryItem, createNewInputType)),
      ),
    { dispatch: false },
  );

  public createNewDirectory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(directoryItemActions.createNewDirectory),
        tap((action) => this.filesystemFacade.createNewDirectory(action.entity, action.name)),
      ),
    { dispatch: false },
  );

  public createNewFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(directoryItemActions.createNewFile),
        tap((action) => this.filesystemFacade.createNewFile(action.entity, action.name)),
      ),
    { dispatch: false },
  );
}
