import { Component, OnInit, Input, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MenuItem, MenuItems } from '../../store/menu-item/menu-item.state';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { menuItemSelectors } from '../../store/menu-item/menu-item.selectors';
import { menuFacadeDep } from '../../services/menu-facade/menu.facade.dependency';
import { MenuFacade } from '../../services/menu-facade/menu.facade';


@Component({
  selector: 'app-menu-item[menuItem]',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent implements OnInit {

  @Input() public menuItem: MenuItem;
  public nestedMenuItems$: Observable<MenuItem[]>;

  constructor(
    private store: Store<MenuItems>,
    @Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade,
  ) { }

  ngOnInit(): void {
    this.nestedMenuItems$ = this.store.pipe(select(menuItemSelectors.selectEntitiesByIds, {ids: this.menuItem.menuItemIds}));
  }

  public click($event: MouseEvent): void {
    this.menuFacade.resolveMenuItemClick(this.menuItem.id);
  }
}
