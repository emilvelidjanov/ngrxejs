import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './state/app.state';
import * as MenuActions from './menu/actions/menu.actions';
import mainMenuConfig from '../config/mainMenu.json';
import { MenuState, clone } from './menu/state/menu.state';
import { MenuItemState } from './menu/state/menu-item.state';
import { selectMenu } from './reducers';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public mainMenu$: Observable<MenuState>;
  public mainMenu: MenuState;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(MenuActions.setMenu(mainMenuConfig));
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
  }
}
