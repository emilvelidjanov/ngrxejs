import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import mainMenuBar from '../config/menu/mainMenuBar.json';
import menuItems from '../config/menu/menuItems.json';

import { FilesystemFacade } from './filesystem/services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from './filesystem/services/filesystem-facade/filesystem.facade.dependency';
import { MenuFacade } from './menu/services/menu-facade/menu.facade';
import { menuFacadeDep } from './menu/services/menu-facade/menu.facade.dependency';
import { AppState } from './store/app/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public mainMenuId: string;

  constructor(
    private store: Store<AppState>,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
    @Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade,
  ) {
    this.mainMenuId = 'mainMenuBar';
  }

  public ngOnInit(): void {
    this.menuFacade.createMenu(mainMenuBar, menuItems);
  }
}
