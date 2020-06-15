import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { EditorComponent } from './components/editor/editor.component';
import { TabBarItemComponent } from './components/tab-bar-item/tab-bar-item.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { editorFacadeDep } from './services/editor-facade/editor.facade.dependency';
import { editorServiceDep } from './services/editor-service/editor.service.dependency';
import { editorFeatureKey, metaReducers, reducers } from './store';
import { EditorEffects } from './store/editor/editor.effects';

@NgModule({
  declarations: [EditorComponent, TabBarComponent, TabBarItemComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(editorFeatureKey, reducers, { metaReducers }),
    EffectsModule.forFeature([EditorEffects]),
  ],
  providers: [],
  exports: [EditorComponent],
})
export class EditorModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: EditorModule,
      providers: [editorServiceDep.getProvider(), editorFacadeDep.getProvider()],
    };
  }
}
