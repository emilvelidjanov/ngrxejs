import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import projectTreesConfig from '../config/filesystem/projectTrees.json';
import contextMenusConfig from '../config/menu/contextMenus.json';
import menuBarsConfig from '../config/menu/menuBars.json';
import menuItemsConfig from '../config/menu/menuItems.json';

import { FilesystemFacade } from './filesystem/services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from './filesystem/services/filesystem-facade/filesystem.facade.dependency';
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
  public mainProjectTreeId: string;

  constructor(
    @Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
  ) {
    this.mainMenuBarId = 'mainMenuBar';
    this.mainProjectTreeId = 'mainProjectTree';
  }

  public ngOnInit(): void {
    this.menuFacade.addMenuItemsConfig(menuItemsConfig);
    this.menuFacade.addMenuBarsConfig(menuBarsConfig);
    this.menuFacade.addContextMenusConfig(contextMenusConfig);
    this.filesystemFacade.addProjectTreesConfig(projectTreesConfig);
  }
}
