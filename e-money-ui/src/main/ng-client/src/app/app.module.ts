import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RequestInterceptor} from "./core/lib/interceptor/request.interceptor";
import {SessionStorageService} from "./core/lib/services/session-storage.service";
import {AuthGuard} from "./core/lib/services/auth-guard.service";
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
  },
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    // HttpService,
    SessionStorageService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
