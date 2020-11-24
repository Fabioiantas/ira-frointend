import {Component, HostBinding, ɵConsole} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ThemeOptions} from '../../../theme-options';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  userEmail: string;

  constructor(public globals: ThemeOptions,
              private authenticationService: AuthenticationService) {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.userEmail = this.authenticationService.currentUserValue.user.email;
    // this.authenticationService.getCurrentUser().subscribe(user => {
    //   this.userEmail = user.user.email;
    // });
  }

  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }

  // tslint:disable-next-line:member-ordering
  isActive: boolean;

  // tslint:disable-next-line:member-ordering
  @select('config') public config$: Observable<any>;

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

  toggleHeaderMobile() {
    this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
  }

}
