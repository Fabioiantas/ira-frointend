import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { DialogBoxService } from '../_services/dialog-box.service';
// import { ConsoleReporter } from 'jasmine';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private dialogBox: DialogBoxService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401].indexOf(err.status) !== -1) {
        this.authenticationService.logout();
        location.reload(true);
        return throwError(err.error.message);
      }
      if ([500].indexOf(err.status) !== -1) {
        console.log('err: ' + JSON.stringify(err))
        this.dialogBox.show(err.error.message, 'ERROR');
        return throwError(err.message);
      }
      if ([512].indexOf(err.status) !== -1) {
        this.dialogBox.show(err.error.message, 'ERROR');
        return throwError(err.message);
      }
      if ('0'.indexOf(err.status) !== -1) {
        return throwError(JSON.stringify(err));
      }
      const error = err.error || err.statusText;
      return throwError(error);
    }));
  }
}
