import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { buildSpecificModules } from "src/build-specifics/index";
import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';
import { FilesystemModule } from './filesystem/filesystem.module';
import { EditorModule } from './editor/editor.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {}),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({}),
    buildSpecificModules,
    MenuModule.forRoot(),
    FilesystemModule.forRoot(),
    EditorModule.forRoot()
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
