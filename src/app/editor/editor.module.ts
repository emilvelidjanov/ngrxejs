import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [EditorComponent],
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
