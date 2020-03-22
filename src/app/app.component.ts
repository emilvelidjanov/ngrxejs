import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Menu } from './menu/menu/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public mainMenu: Menu;

  constructor() { }

  ngOnInit(): void {
    this.mainMenu = new Menu({
      title: 'ngrxejs',
      logo: 'assets/img/angular.png',
      menuItems: [
        {
          label: 'item1'
        }, {
          label: 'item2'
        }, {
          label: 'item3'
        }
      ]
    });
  }
}
