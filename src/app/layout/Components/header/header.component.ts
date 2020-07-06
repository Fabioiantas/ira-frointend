import {Component, HostBinding} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ThemeOptions} from '../../../theme-options';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  currentUser = atob(localStorage.getItem('user'));
  userEmail: string;

  constructor(public globals: ThemeOptions
             ,private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    //this.userEmail = this.currentUser.email;
    // this.email = this.authenticationService.currentUserValue;
  }

  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }

  isActive: boolean;

  @select('config') public config$: Observable<any>;

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

  toggleHeaderMobile() {
    this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
  }

}
