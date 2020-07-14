import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  currentUser: any;
  userName: string;
  userFirstName: string;

  constructor(public globals: ThemeOptions
             ,private authenticationService: AuthenticationService
             ,private router: Router)
  {
  }

  ngOnInit() {
    this.authenticationService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.userName = user.user.name;
      this.userFirstName = user.user.name.substr(0, user.user.name.indexOf( " " ));
    });
  }

  editPerfil() {
    this.router.navigate(['/usuario/editar/' + this.currentUser.user.id])
  }

}
