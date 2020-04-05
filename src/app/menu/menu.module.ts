import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { StoreModule } from '@ngrx/store';
import { menuFeatureKey, reducers, metaReducers } from './reducers';


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
      providers: []
    }
  }
}
