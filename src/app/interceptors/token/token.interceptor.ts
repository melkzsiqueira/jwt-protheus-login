import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import Token from '../../models/token';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUserValue: Token = this.authenticationService.currentUserValue;

    if ( currentUserValue && currentUserValue.access_token ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserValue.access_token}`
        }
      });
    }

    return next.handle(request);
  }
}
