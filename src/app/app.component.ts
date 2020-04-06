import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Menu } from './menu/components/menu/menu';
import { MenuItem } from './menu/components/menu-item/menu-item';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import * as MenuActions from './menu/actions/menu.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public mainMenu: Menu;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(MenuActions.setMenu({
      title: "ngrxejs2",
      logo: "",
      menuItems: []
    }));

    // Test menu, no actual state yet
    this.mainMenu = new Menu({
      title: 'ngrxejs',
      logo: 'assets/img/ngrx.png',
      menuItems: [
        new MenuItem({
          label: "Item1",
          nestedMenuItems: [
            new MenuItem({
              label: "Nested1 Long",
              click: ($event: MouseEvent) => console.log("Nested1 clicked!", $event)
            }),
            new MenuItem({
              label: "Nstd2",
              click: ($event: MouseEvent) => console.log("Nested2 clicked!", $event)
            }),
          ]
        }),
        new MenuItem({
          label: "Item2",
          nestedMenuItems: [
            new MenuItem({
              label: "Nested3",
              click: ($event: MouseEvent) => console.log("Nested3 clicked!", $event)
            }),
            new MenuItem({
              label: "Nested4",
              click: ($event: MouseEvent) => console.log("Nested4 clicked!", $event)
            }),
          ]
        }),
        new MenuItem({
          label: "Item3"
        }),
      ]
    });
  }
}
