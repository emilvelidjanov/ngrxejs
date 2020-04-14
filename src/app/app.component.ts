import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './state/app.state';
import { setMenu } from './menu/actions/menu.actions';
import mainMenuConfig from '../config/mainMenu.json';
import { MenuState, clone } from './menu/state/menu.state';
import { MenuItemState } from './menu/state/menu-item.state';
import { selectMenu, selectFileTree } from './reducers';
import { Observable } from 'rxjs';
import { setFileTree } from './filesystem/actions/filesystem.actions';
import { FileTreeState } from './filesystem/state/file-tree.state';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public mainMenu$: Observable<MenuState>;
  public mainMenu: MenuState;

  public fileTree$: Observable<FileTreeState>;
  public fileTree: FileTreeState;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(setMenu(mainMenuConfig));
    this.mainMenu$ = this.store.pipe(select(selectMenu));
    this.mainMenu$.subscribe((mainMenu: MenuState) => {
      this.mainMenu = clone(mainMenu);
      if (this.mainMenu.menuItems) {
        this.mainMenu.menuItems
        .flatMap((menuItem: MenuItemState) => menuItem.nestedMenuItems)
        .forEach((nestedMenuItem: MenuItemState) => {
          nestedMenuItem.click = ($event: MouseEvent) => console.log(`MenuItem clicked: ${nestedMenuItem.label}`, $event);
        });
      }
    });

    this.store.dispatch(setFileTree({
      loadedDirectory: "test"
    }));
    this.fileTree$ = this.store.pipe(select(selectFileTree));
    this.fileTree$.subscribe((fileTree: FileTreeState) => {
      console.log("New filesystem store:", fileTree);
      this.fileTree = fileTree;
    });
  }
}
