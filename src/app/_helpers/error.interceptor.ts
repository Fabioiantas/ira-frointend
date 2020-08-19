import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { DialogBoxService } from '../_services/dialog-box.service';
import { Router } from '@angular/router';
// import { ConsoleReporter } from 'jasmine';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  sessao = true;

  constructor(private authenticationService: AuthenticationService,
              private dialogBox: DialogBoxService,
              private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401].indexOf(err.status) !== -1) {
        this.dialogBox.show('Usuário ou senha inválidos.', 'ERROR');
        this.authenticationService.logout();
        location.reload(true);
        return throwError(err.error.message);
      }
      if ([500].indexOf(err.status) !== -1) {
        this.dialogBox.show(err.error.message, 'ERROR');
        return throwError(err.message);
      }
      if ([512].indexOf(err.status) !== -1) {
        this.dialogBox.show(err.error.message, 'ERROR');
        return throwError(err.message);
      }
      if ([513].indexOf(err.status) !== -1) { // SESSAO EXPIRADA
        this.sessao = false;
        this.router.navigate(['/login'], { queryParams: { message: err.error.message } });
        // this.dialogBox.show(err.error.message, 'ERROR');
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
