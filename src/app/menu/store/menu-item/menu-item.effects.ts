import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { MenuFacade } from '../../services/menu-facade/menu.facade';
import { menuFacadeDep } from '../../services/menu-facade/menu.facade.dependency';

import { menuItemActions } from './menu-item.actions';

@Injectable()
export class MenuItemEffects {
  constructor(private actions$: Actions, @Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade) {}

  public onClick$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(menuItemActions.onClick),
        tap((action) => this.menuFacade.onClickMenuItem(action.entity)),
      ),
    { dispatch: false },
  );

  public offClickNestedMenuItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(menuItemActions.offClickNestedMenuItems),
        tap(() => this.menuFacade.closeAllMenuItems()),
      ),
    { dispatch: false },
  );

  public onOffHover$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(menuItemActions.onOffHover),
        tap((action) => this.menuFacade.toggleOpenedMenuItem(action.entity)),
      ),
    { dispatch: false },
  );
}
