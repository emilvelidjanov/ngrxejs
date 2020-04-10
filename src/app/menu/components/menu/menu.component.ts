import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MenuState } from '../../state/menu.state';


@Component({
  selector: 'app-menu[menu]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  @Input() public menu: MenuState;

  constructor() { }

  ngOnInit(): void {
  }

}
