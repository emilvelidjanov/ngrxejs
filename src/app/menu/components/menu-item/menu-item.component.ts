import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, takeWhile, tap } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { menuItemActions } from '../../store/menu-item/menu-item.actions';
import { menuItemSelectors } from '../../store/menu-item/menu-item.selectors';
import { MenuItem, MenuItems } from '../../store/menu-item/menu-item.state';

@Component({
  selector: 'app-menu-item[menuItemId]',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent implements OnInit {
  @Input() public menuItemId: Id;
  public menuItem$: Observable<MenuItem>;
  public isOpened$: Observable<boolean>;

  constructor(private store: Store<MenuItems>) {}

  public ngOnInit(): void {
    this.menuItem$ = this.store.pipe(select(menuItemSelectors.selectEntityById, { id: this.menuItemId }));
    this.isOpened$ = this.store.pipe(select(menuItemSelectors.selectIsOpenedId, { id: this.menuItemId }));
  }

  public click(): void {
    this.menuItem$
      .pipe(
        tap((menuItem: MenuItem) => this.store.dispatch(menuItemActions.click({ entity: menuItem }))),
        take(1),
      )
      .subscribe();
  }

  public clickOff($event: MouseEvent): void {
    const target = $event.target as HTMLElement;
    this.store.dispatch(menuItemActions.clickOff({ htmlNodeName: target.parentElement.nodeName }));
  }
}
