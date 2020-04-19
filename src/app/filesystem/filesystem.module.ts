import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { filesystemFeatureKey, reducers, metaReducers } from './store/reducers';
import { FileTreeComponent } from './components/file-tree/file-tree.component';
import { filesystemServiceDep } from './services/filesystem-service/filesystem.service.dependency';
import { filesystemFacadeDep } from './services/filesystem-facade/filesystem.facade.dependency';


@NgModule({
  declarations: [FileTreeComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(filesystemFeatureKey, reducers, { metaReducers: metaReducers })
  ],
  exports: [FileTreeComponent]
})
export class FilesystemModule { 
  
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FilesystemModule,
      providers: [
        filesystemServiceDep.getProvider(),
        filesystemFacadeDep.getProvider(),
      ]
    }
  }
}
