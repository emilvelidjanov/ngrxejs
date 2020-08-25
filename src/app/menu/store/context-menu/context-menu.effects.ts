import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { MenuFacade } from '../../services/menu-facade/menu.facade';
import { menuFacadeDep } from '../../services/menu-facade/menu.facade.dependency';

import { contextMenuActions } from './context-menu.actions';

@Injectable()
export class ContextMenuEffects {
  constructor(private actions$: Actions, @Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade) {}

  public close$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(contextMenuActions.close),
        tap((action) => this.menuFacade.closeContextMenu(action.entity)),
      ),
    { dispatch: false },
  );

  public open$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(contextMenuActions.open),
        tap((action) => this.menuFacade.openContextMenu(action.entity, action.x, action.y, action.props)),
      ),
    { dispatch: false },
  );
}
