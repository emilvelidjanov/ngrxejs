import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from '../core/core.module';

import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { menuFacadeDep } from './services/menu-facade/menu.facade.dependency';
import { menuItemServiceDep } from './services/menu-item-service/menu-item.service.dependency';
import { menuServiceDep } from './services/menu-service/menu.service.dependency';
import { menuFeatureKey, metaReducers, reducers } from './store';
import { MenuItemEffects } from './store/menu-item/menu-item.effects';

@NgModule({
  declarations: [MenuBarComponent, MenuItemComponent, ContextMenuComponent],
  imports: [
    CoreModule,
    CommonModule,
    StoreModule.forFeature(menuFeatureKey, reducers, { metaReducers }),
    EffectsModule.forFeature([MenuItemEffects]),
  ],
  providers: [],
  exports: [MenuBarComponent, ContextMenuComponent],
})
export class MenuModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MenuModule,
      providers: [menuFacadeDep.getProvider(), menuItemServiceDep.getProvider(), menuServiceDep.getProvider()],
    };
  }
}
