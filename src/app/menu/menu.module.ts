import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
  declarations: [MenuComponent, MenuItemComponent],
  imports: [CommonModule],
  providers: [],
  exports: [MenuComponent]
})
export class MenuModule {
  
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MenuModule,
      providers: []
    }
  }
}
