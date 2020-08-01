import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { MenuFacade } from '../../services/menu-facade/menu.facade';
import { menuFacadeDep } from '../../services/menu-facade/menu.facade.dependency';

import { tabItemActions } from './tab-item.actions';

@Injectable()
export class TabItemEffects {
  constructor(private actions$: Actions, @Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade) {}

  public onClick$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(tabItemActions.onClick),
        tap((action) => this.menuFacade.onClickTabItem(action.entity)),
      ),
    { dispatch: false },
  );

  public close$ = createEffect(() => this.actions$.pipe(ofType(tabItemActions.close)), { dispatch: false });
}
