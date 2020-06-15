import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
// import { ConsoleReporter } from 'jasmine';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401].indexOf(err.status) !== -1) {
        this.authenticationService.logout();
        location.reload(true);
        return throwError(err.error);
      }

      if ('0'.indexOf(err.status) !== -1) {
        return throwError(JSON.stringify(err));
      }
      const error = err.error || err.statusText;
      return throwError(error);
    }));
  }
}
