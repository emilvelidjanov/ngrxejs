import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { EditorComponent } from './editor/editor.component';
import { TabBarItemComponent } from './tab-bar-item/tab-bar-item.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';

@NgModule({
  declarations: [EditorComponent, TabBarComponent, TabBarItemComponent],
  imports: [CommonModule],
  providers: [],
  exports: [EditorComponent],
})
export class EditorModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: EditorModule,
      providers: [],
    };
  }
}
