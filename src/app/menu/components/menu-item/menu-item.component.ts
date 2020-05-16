import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity';

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

  constructor(private store: Store<MenuItems>) {}

  public ngOnInit(): void {
    this.menuItem$ = this.store.pipe(select(menuItemSelectors.selectEntityById, { id: this.menuItemId }));
  }

  public click(): void {
    this.menuItem$
      .pipe(
        filter((menuItem: MenuItem) => menuItem.clickAction !== undefined),
        tap((menuItem: MenuItem) => this.store.dispatch({ type: menuItem.clickAction })),
        take(1),
      )
      .subscribe();
  }
}
