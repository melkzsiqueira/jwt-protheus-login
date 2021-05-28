import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PoModule, PoLoadingModule, PoNavbarModule } from '@po-ui/ng-components';
import { PagesModule } from './pages/pages.module';

import { ErrorInterceptor } from './interceptors/error/error.interceptor';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { AuthenticationService } from '../app/services/authentication/authentication.service';
import { LoadSpinnerService } from './services/load-spinner/load-spinner.service';

import { LoadSpinnerComponent } from './components/load-spinner/load-spinner.component';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    LoadSpinnerComponent, 
    AppComponent, 
    NavbarComponent, 
    NotificationComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    HttpClientModule, 
    AppRoutingModule, 
    PagesModule,
    PoLoadingModule,
    PoNavbarModule,
    PoModule    
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: ErrorInterceptor, 
      multi: true },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor, 
      multi: true 
    },
    AuthenticationService,
    LoadSpinnerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
