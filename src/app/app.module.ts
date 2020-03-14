import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

import { exportModules } from "src/build-specifics/index";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      /** routes */
    ], {
      /** extra options */
    }),
    StoreModule.forRoot({
      /** redux app state */
    }),
    EffectsModule.forRoot([
      /** redux effects */
    ]),
    StoreRouterConnectingModule.forRoot({
      /** router store options */
    }),
    exportModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
