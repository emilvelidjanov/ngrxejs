import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
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

  constructor(private store: Store<MenuItems>) {}

  public ngOnInit(): void {
    this.menuItem$ = this.store.pipe(select(menuItemSelectors.selectEntityById, { id: this.menuItemId }));
  }

  public click(): void {
    this.menuItem$
      .pipe(take(1))
      .subscribe((menuItem: MenuItem) => this.store.dispatch(menuItemActions.onClick({ entity: menuItem })));
  }

  public offClickNestedMenuItems($event: MouseEvent): void {
    const target = $event.target as HTMLElement;
    if (target.parentElement.nodeName !== 'APP-MENU-ITEM') {
      this.store.dispatch(menuItemActions.offClickNestedMenuItems());
    }
  }
}
