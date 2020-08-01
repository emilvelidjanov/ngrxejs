import { Inject } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { EntityPartial } from 'src/app/core/ngrx/entity/entity';
import { FilesystemFacade } from 'src/app/filesystem/services/filesystem-facade/filesystem.facade';
import { filesystemFacadeDep } from 'src/app/filesystem/services/filesystem-facade/filesystem.facade.dependency';
import { File } from 'src/app/filesystem/store/file/file.state';
import { MenuFacade } from 'src/app/menu/services/menu-facade/menu.facade';
import { menuFacadeDep } from 'src/app/menu/services/menu-facade/menu.facade.dependency';

import { Editor } from '../../store/editor/editor.state';
import { EditorService } from '../editor-service/editor.service';
import { editorServiceDep } from '../editor-service/editor.service.dependency';

import { EditorFacade } from './editor.facade';

export class DefaultEditorFacade implements EditorFacade {
  constructor(
    @Inject(editorServiceDep.getToken()) private editorService: EditorService,
    @Inject(filesystemFacadeDep.getToken()) private filesystemFacade: FilesystemFacade,
    @Inject(menuFacadeDep.getToken()) private menuFacade: MenuFacade,
  ) {}

  public addEditorsConfig(partials: EntityPartial<Editor>[]): void {
    const editors = partials.map((partial) => this.editorService.createFromPartial(partial));
    this.editorService.addMany(editors);
  }

  public onClick(editor: Editor): void {
    this.editorService.focus(editor);
  }

  public selectFocusedEditor(): Observable<Editor> {
    return this.editorService.selectFocused();
  }

  public openFile(file: File, editor: Editor): void {
    if (!this.editorService.isOpenedFile(file, editor)) {
      this.filesystemFacade.loadFile(file);
      const createTabItem$ = this.menuFacade.createTabItem().pipe(
        map((tabItem) => this.editorService.mapToTabItem(tabItem, file)),
        take(1),
      );
      const selectTabBar$ = this.menuFacade.selectTabBar(editor.tabBarId).pipe(take(1));
      forkJoin([createTabItem$, selectTabBar$]).subscribe(([tabItem, tabBar]) => {
        this.editorService.addOpenedFiles([file], editor);
        this.menuFacade.addTabItemsConfig([tabItem]);
        this.menuFacade.addTabItemsToTabBar([tabItem], tabBar);
      });
    }
    this.editorService.focusFile(file, editor);
  }
}
