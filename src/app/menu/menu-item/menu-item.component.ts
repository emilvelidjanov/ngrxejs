import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent implements OnInit {

  @Input() public menuItem: MenuItem;

  constructor() { }

  ngOnInit(): void {
  }

}
