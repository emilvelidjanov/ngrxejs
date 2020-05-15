import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem, MenuItems } from '../../store/menu-item/menu-item.state';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { menuItemSelectors } from '../../store/menu-item/menu-item.selectors';
import { filter, tap, take } from 'rxjs/operators';
import { Id } from 'src/app/core/ngrx/entity';


@Component({
  selector: 'app-menu-item[menuItemId]',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent implements OnInit {

  @Input() public menuItemId: Id;
  public menuItem$: Observable<MenuItem>;

  constructor(
    private store: Store<MenuItems>,
  ) { }

  ngOnInit(): void {
    this.menuItem$ = this.store.pipe(select(menuItemSelectors.selectEntityById, { id: this.menuItemId }));
  }

  click(): void {
    this.menuItem$.pipe(
      take(1),
      filter((menuItem: MenuItem) => menuItem.clickAction !== undefined),
      tap((menuItem: MenuItem) => this.store.dispatch({ type: menuItem.clickAction })),
    ).subscribe();
  }
}
