import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { MenuComponent } from './components/menu/menu.component';
import { menuFacadeDep } from './services/menu-facade/menu.facade.dependency';
import { menuItemServiceDep } from './services/menu-item-service/menu-item.service.dependency';
import { menuServiceDep } from './services/menu-service/menu.service.dependency';
import { menuFeatureKey, metaReducers, reducers } from './store';

@NgModule({
  declarations: [MenuComponent, MenuItemComponent],
  imports: [CommonModule, StoreModule.forFeature(menuFeatureKey, reducers, { metaReducers })],
  providers: [],
  exports: [MenuComponent],
})
export class MenuModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MenuModule,
      providers: [menuFacadeDep.getProvider(), menuItemServiceDep.getProvider(), menuServiceDep.getProvider()],
    };
  }
}
