import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'electron';
import { map, withLatestFrom } from 'rxjs/operators';

import editors from '../config/editor/editors.json';
import projectTreesConfig from '../config/filesystem/projectTrees.json';
import contextMenusConfig from '../config/menu/contextMenus.json';
import menuBarsConfig from '../config/menu/menuBars.json';
import menuItemsConfig from '../config/menu/menuItems.json';
import tabBars from '../config/menu/tabBars.json';

import { EntityPartial } from './core/ngrx/entity/entity';
import { EditorFacade } from './editor/services/editor-facade/editor.facade';
import { editorFacadeDep } from './editor/services/editor-facade/editor.facade.dependency';
import { Editor } from './editor/store/editor/editor.state';
import { FilesystemFacade } from './filesystem/services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from './filesystem/services/filesystem-facade/filesystem.facade.dependency';
import { projectTreeSelectors } from './filesystem/store/project-tree/project-tree.selectors';
import { ProjectTree } from './filesystem/store/project-tree/project-tree.state';
import { MenuFacade } from './menu/services/menu-facade/menu.facade';
import { menuFacadeDep } from './menu/services/menu-facade/menu.facade.dependency';
import { ContextMenu } from './menu/store/context-menu/context-menu.state';
import { MenuBar } from './menu/store/menu-bar/menu-bar.state';
import { menuItemSelectors } from './menu/store/menu-item/menu-item.selectors';
import { TabBar } from './menu/store/tab-bar/tab-bar.state';
import { AppState } from './store/app/app.state';

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
    private store: Store<AppState>,
    @Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
    @Inject(editorFacadeDep.getToken()) private editorFacade: EditorFacade,
  ) {
    this.mainMenuBarId = 'mainMenuBar';
    this.mainProjectTreeId = 'mainProjectTree';
    this.mainEditorId = 'mainEditor';
  }

  public ngOnInit(): void {
    // TODO: pass in directory and read in facade instead?
    this.menuFacade.addMenuItemsConfig(menuItemsConfig as EntityPartial<MenuItem>[]);
    this.menuFacade.addMenuBarsConfig(menuBarsConfig as EntityPartial<MenuBar>[]);
    this.menuFacade.addContextMenusConfig(contextMenusConfig as EntityPartial<ContextMenu>[]);
    this.menuFacade.addTabBarsConfig(tabBars as EntityPartial<TabBar>[]);
    this.filesystemFacade.addProjectTreesConfig(projectTreesConfig as EntityPartial<ProjectTree>[]);
    this.editorFacade.addEditorsConfig(editors as EntityPartial<Editor>[]);

    // TODO: is this configurable somehow?
    const newMenuItem$ = this.store.pipe(select(menuItemSelectors.selectEntityById, { id: 'new' }));
    const projectTree$ = this.store.pipe(select(projectTreeSelectors.selectEntityById, { id: this.mainProjectTreeId }));
    const hasOpenedProject$ = projectTree$.pipe(map((projectTree) => projectTree.projectId !== null));
    hasOpenedProject$.pipe(withLatestFrom(newMenuItem$)).subscribe(([hasOpenedProject, menuItem]) => {
      this.menuFacade.updateIsDisabledMenuItem(!hasOpenedProject, menuItem);
    });
  }
}
