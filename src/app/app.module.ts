import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { EditorModule } from './editor/editor.module';
import { FilesystemModule } from './filesystem/filesystem.module';
import { MenuModule } from './menu/menu.module';
import { metaReducers, reducers } from './store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {}),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 100,
      logOnly: environment.production,
    }),
    CoreModule.forRoot(),
    MenuModule.forRoot(),
    FilesystemModule.forRoot(),
    EditorModule.forRoot(),
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
