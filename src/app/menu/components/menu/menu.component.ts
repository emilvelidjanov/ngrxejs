import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Menu } from '../../store/menu/menu.state';
import { Observable } from 'rxjs';
import { MenuState } from '../../store';
import { Store, select } from '@ngrx/store';
import { menuSelectors } from '../../store/menu/menu.selectors';
import { MenuItem } from '../../store/menu-item/menu-item.state';


@Component({
  selector: 'app-menu[menuId]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  @Input() private menuId: string;
  public menu$: Observable<Menu>;
  public menuItems$: Observable<MenuItem[]>;

  constructor(
    private store: Store<MenuState>,
  ) { }

  ngOnInit(): void {
    this.menu$ = this.store.pipe(select(menuSelectors.selectEntityById, {id: this.menuId}));
    this.menuItems$ = this.store.pipe(select(menuSelectors.selectMenuItems, {id: this.menuId}));
  }

}
