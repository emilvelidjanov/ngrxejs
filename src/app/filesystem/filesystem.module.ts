import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesystemComponent } from './filesystem/filesystem.component';


@NgModule({
  declarations: [FilesystemComponent],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [FilesystemComponent]
})
export class FilesystemModule { 
  
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FilesystemModule,
      providers: []
    }
  }
}
