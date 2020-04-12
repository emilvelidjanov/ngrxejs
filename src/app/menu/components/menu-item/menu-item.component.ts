import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MenuItemState } from '../../state/menu-item.state';


@Component({
  selector: 'app-menu-item[menuItem]',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent implements OnInit {

  @Input() public menuItem: MenuItemState;

  constructor() { }

  ngOnInit(): void {
  }

  public click($event: MouseEvent): void {
    if (this.menuItem.click) this.menuItem.click($event);
  }

}
