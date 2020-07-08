import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from '../core/core.module';

import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { ContextMenuTriggerDirective } from './directives/context-menu-trigger.directive';
import { contextMenuServiceDep } from './services/context-menu-service/context-menu.service.dependency';
import { menuBarServiceDep } from './services/menu-bar-service/menu-bar.service.dependency';
import { menuFacadeDep } from './services/menu-facade/menu.facade.dependency';
import { menuItemServiceDep } from './services/menu-item-service/menu-item.service.dependency';
import { menuFeatureKey, metaReducers, reducers } from './store';
import { ContextMenuEffects } from './store/context-menu/context-menu.effects';
import { MenuItemEffects } from './store/menu-item/menu-item.effects';

@NgModule({
  declarations: [MenuBarComponent, MenuItemComponent, ContextMenuComponent, ContextMenuTriggerDirective],
  imports: [
    CoreModule,
    CommonModule,
    StoreModule.forFeature(menuFeatureKey, reducers, { metaReducers }),
    EffectsModule.forFeature([MenuItemEffects, ContextMenuEffects]),
  ],
  providers: [],
  exports: [MenuBarComponent, ContextMenuComponent, ContextMenuTriggerDirective],
})
export class MenuModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MenuModule,
      providers: [
        menuFacadeDep.getProvider(),
        menuItemServiceDep.getProvider(),
        menuBarServiceDep.getProvider(),
        contextMenuServiceDep.getProvider(),
      ],
    };
  }
}
