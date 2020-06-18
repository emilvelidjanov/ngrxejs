import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { MenuFacade } from '../../services/menu-facade/menu.facade';
import { menuFacadeDep } from '../../services/menu-facade/menu.facade.dependency';

import { menuItemActions } from './menu-item.actions';

@Injectable()
export class MenuItemEffects {
  constructor(private actions$: Actions, @Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade) {}

  public click$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(menuItemActions.click),
        tap((action) => this.menuFacade.click(action.entity)),
      ),
    { dispatch: false },
  );

  public clickOff$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(menuItemActions.clickOff),
        tap(() => this.menuFacade.clickOff()),
      ),
    { dispatch: false },
  );
}
