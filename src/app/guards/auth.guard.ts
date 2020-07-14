﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { DialogBoxService } from '../_services/dialog-box.service';
// import { ConsoleService } from '@ng-select/ng-select/ng-select/console.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private dialogBox: DialogBoxService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(currentUser.user.role) === -1) {
        // role not authorised so redirect to home page
        this.dialogBox.show('Você não tem permissão para acessar essa página!', 'ERROR');
          this.router.navigate(['/']);
          return false;
      }

      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
