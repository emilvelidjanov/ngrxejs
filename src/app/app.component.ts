import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import contextMenus from '../config/menu/contextMenus.json';
import menuBars from '../config/menu/menuBars.json';
import menuItems from '../config/menu/menuItems.json';

import { MenuFacade } from './menu/services/menu-facade/menu.facade';
import { menuFacadeDep } from './menu/services/menu-facade/menu.facade.dependency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public mainMenuBarId: string;

  constructor(@Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade) {
    this.mainMenuBarId = 'mainMenuBar';
  }

  public ngOnInit(): void {
    this.menuFacade.addMenuItemsConfig(menuItems);
    this.menuFacade.addMenuBarsConfig(menuBars);
    this.menuFacade.addContextMenusConfig(contextMenus);
  }
}
