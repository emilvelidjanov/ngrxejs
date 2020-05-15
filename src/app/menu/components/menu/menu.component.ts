import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Menu, Menus } from '../../store/menu/menu.state';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { menuSelectors } from '../../store/menu/menu.selectors';
import { Id } from 'src/app/core/ngrx/entity';


@Component({
  selector: 'app-menu[menuId]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  @Input() private menuId: Id;
  public menu$: Observable<Menu>;

  constructor(
    private store: Store<Menus>,
  ) { }

  ngOnInit(): void {
    this.menu$ = this.store.pipe(select(menuSelectors.selectEntityById, {id: this.menuId}));
  }
}
