import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbDialogModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
  NbWindowModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./shared/interceptors/jwt.interceptor";
import {ErrorInterceptor} from "./shared/interceptors/error.interceptor";
import {SharedModule} from "./shared/shared.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NbLayoutModule,
    NbEvaIconsModule,
    HttpClientModule,
    NgbModule,
    NbIconModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbWindowModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-PT'},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
