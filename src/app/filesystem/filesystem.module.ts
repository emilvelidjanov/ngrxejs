import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { filesystemServiceProvider } from './filesystem-service/filesystem.service.provider';
import { ElectronService } from './electron-service/electron.service';


@NgModule({
  declarations: [FileTreeComponent],
  imports: [
    CommonModule
  ],
  providers: [filesystemServiceProvider, ElectronService],
  exports: [FileTreeComponent]
})
export class FilesystemModule { 
  
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FilesystemModule,
      providers: [filesystemServiceProvider]
    }
  }
}
