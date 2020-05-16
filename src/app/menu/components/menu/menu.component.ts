import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity';

import { menuSelectors } from '../../store/menu/menu.selectors';
import { Menu, Menus } from '../../store/menu/menu.state';

@Component({
  selector: 'app-menu[menuId]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  @Input() private menuId: Id;
  public menu$: Observable<Menu>;

  constructor(private store: Store<Menus>) {}

  public ngOnInit(): void {
    this.menu$ = this.store.pipe(select(menuSelectors.selectEntityById, { id: this.menuId }));
  }
}
