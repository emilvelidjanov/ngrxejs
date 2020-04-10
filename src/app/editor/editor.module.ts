import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';


@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [EditorComponent]
})
export class EditorModule { 
  
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EditorModule,
      providers: []
    }
  }
}
