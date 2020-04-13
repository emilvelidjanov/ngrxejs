import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { filesystemServiceDep } from './filesystem-service/filesystem.service.dependency';
import { filesystemFacadeDep } from './filesystem-facade/filesystem.facade.dependency';


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
      providers: [filesystemServiceDep.getProvider(), filesystemFacadeDep.getProvider()]
    }
  }
}
