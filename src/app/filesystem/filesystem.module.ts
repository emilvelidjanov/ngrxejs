import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { ElectronService } from './electron/electron-service/electron.service';
import { IpcService } from './electron/ipc-service/ipc.service';
import { filesystemServiceProvider } from './filesystem-service/filesystem.service.provider';


@NgModule({
  declarations: [FileTreeComponent],
  imports: [
    CommonModule
  ],
  exports: [FileTreeComponent]
})
export class FilesystemModule { 
  
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FilesystemModule,
      providers: [ElectronService, IpcService, filesystemServiceProvider]
    }
  }
}
