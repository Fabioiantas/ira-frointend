import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ConsoleService } from '@ng-select/ng-select/ng-select/console.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    // return true;
    //console.log('route: ' + route.data.roles +' - '+ currentUser + '-' +JSON.stringify(this.authenticationService.currentUserValue.user.ie_administrador));
    if (currentUser) {
      // check if route is restricted by role
      console.log('currentUser: ' + route.data.roles + '-' +JSON.stringify(currentUser.user.ie_administrador));
      if (route.data.roles && route.data.roles.indexOf('S') === -1) {
        // role not authorised so redirect to home page
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
