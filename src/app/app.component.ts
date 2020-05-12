import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app/app.state';
import { filesystemFacadeDep } from './filesystem/services/filesystem-facade/filesystem.facade.dependency';
import { FilesystemFacade } from './filesystem/services/filesystem-facade/filesystem.facade';
import { menuFacadeDep } from './menu/services/menu-facade/menu.facade.dependency';
import { MenuFacade } from './menu/services/menu-facade/menu.facade';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  mainMenuId: string;

  constructor(
    private store: Store<AppState>,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
    @Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade,
  ) {
    this.mainMenuId = "mainMenu";
  }

  ngOnInit(): void { }
}
