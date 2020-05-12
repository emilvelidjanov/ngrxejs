import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { StoreModule } from '@ngrx/store';
import { menuFacadeDep } from './services/menu-facade/menu.facade.dependency';
import { menuFeatureKey, reducers, metaReducers } from './store';
import { menuItemServiceDep } from './services/menu-item-service/menu-item.service.dependency';
import { menuServiceDep } from './services/menu-service/menu.service.dependency';


@NgModule({
  declarations: [MenuComponent, MenuItemComponent],
  imports: [
    CommonModule, 
    StoreModule.forFeature(menuFeatureKey, reducers, { metaReducers: metaReducers })
  ],
  providers: [],
  exports: [MenuComponent]
})
export class MenuModule {
  
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MenuModule,
      providers: [
        menuFacadeDep.getProvider(),
        menuItemServiceDep.getProvider(),
        menuServiceDep.getProvider(),
      ]
    }
  }
}
