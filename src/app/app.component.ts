import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import menuItems from '../config/menu/menuItems.json';
import menus from '../config/menu/menus.json';

import { MenuFacade } from './menu/services/menu-facade/menu.facade';
import { menuFacadeDep } from './menu/services/menu-facade/menu.facade.dependency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public mainMenuId: string;

  constructor(@Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade) {
    this.mainMenuId = 'mainMenuBar';
  }

  public ngOnInit(): void {
    this.menuFacade.addMenus(menus, menuItems);
  }
}
