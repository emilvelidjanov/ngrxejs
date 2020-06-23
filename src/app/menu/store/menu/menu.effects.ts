import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { MenuFacade } from '../../services/menu-facade/menu.facade';
import { menuFacadeDep } from '../../services/menu-facade/menu.facade.dependency';

import { menuActions } from './menu.actions';

@Injectable()
export class MenuEffects {
  constructor(private actions$: Actions, @Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade) {}

  public close$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(menuActions.closeMenu),
        tap((action) => this.menuFacade.closeMenu(action.id)),
      ),
    { dispatch: false },
  );

  public openContextMenu$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(menuActions.openContextMenu),
        tap((action) => this.menuFacade.openContextMenu(action.id, action.x, action.y)),
      ),
    { dispatch: false },
  );
}
