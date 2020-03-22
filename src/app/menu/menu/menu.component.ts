import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Menu } from './menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  @Input() public menu: Menu;

  constructor() { }

  ngOnInit(): void {
  }

}
