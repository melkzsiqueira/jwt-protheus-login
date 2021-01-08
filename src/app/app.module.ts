import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { PagesModule } from './pages/pages.module';

import { ErrorInterceptor } from './interceptors/error/error.interceptor';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { AuthenticationService } from '../app/services/authentication/authentication.service';

import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PagesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthenticationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
