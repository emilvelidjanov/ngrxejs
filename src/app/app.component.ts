import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import editors from '../config/editor/editors.json';
import projectTreesConfig from '../config/filesystem/projectTrees.json';
import contextMenusConfig from '../config/menu/contextMenus.json';
import menuBarsConfig from '../config/menu/menuBars.json';
import menuItemsConfig from '../config/menu/menuItems.json';
import tabBars from '../config/menu/tabBars.json';

import { EditorFacade } from './editor/services/editor-facade/editor.facade';
import { editorFacadeDep } from './editor/services/editor-facade/editor.facade.dependency';
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
  public mainEditorId: string;

  constructor(
    @Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
    @Inject(editorFacadeDep.getToken()) private editorFacade: EditorFacade,
  ) {
    this.mainMenuBarId = 'mainMenuBar';
    this.mainProjectTreeId = 'mainProjectTree';
    this.mainEditorId = 'mainEditor';
  }

  public ngOnInit(): void {
    this.menuFacade.addMenuItemsConfig(menuItemsConfig);
    this.menuFacade.addMenuBarsConfig(menuBarsConfig);
    this.menuFacade.addContextMenusConfig(contextMenusConfig);
    this.menuFacade.addTabBarsConfig(tabBars);
    this.filesystemFacade.addProjectTreesConfig(projectTreesConfig);
    this.editorFacade.addEditorsConfig(editors);
  }
}
