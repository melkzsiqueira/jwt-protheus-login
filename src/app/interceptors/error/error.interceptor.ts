import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import * as bulmaToast from 'bulma-toast';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor, ErrorHandler {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authenticationService.deleteToken();
          err.error.message = 'Falha de autenticação. Usuário ou Senha inválidos!';
        }

        const error = err.error.message || err.statusText;

        this.errorToast(error);

        return throwError(error);
      })
    );
  }

  handleError(error: any): any {
    this.errorToast(error);

    return throwError(error);
  }

  errorToast(error: any): void {
    bulmaToast.toast({
      message: error,
      type: 'is-danger',
      dismissible: false,
      duration: 3000,
      position: 'bottom-center',
      closeOnClick: true,
    });
  }
}
