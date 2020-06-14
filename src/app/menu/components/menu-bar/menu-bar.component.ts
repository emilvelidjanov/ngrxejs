import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Id } from 'src/app/core/ngrx/entity/entity';

import { menuSelectors } from '../../store/menu/menu.selectors';
import { Menu, Menus } from '../../store/menu/menu.state';

@Component({
  selector: 'app-menu-bar[menuId]',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarComponent implements OnInit {
  @Input() private menuId: Id;
  public menu$: Observable<Menu>;

  constructor(private store: Store<Menus>) {}

  public ngOnInit(): void {
    this.menu$ = this.store.pipe(select(menuSelectors.selectEntityById, { id: this.menuId }));
  }
}
