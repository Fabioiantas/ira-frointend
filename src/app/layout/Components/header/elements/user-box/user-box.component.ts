import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  // currentUser = JSON.parse(atob(localStorage.getItem('user')));
  userName: string;

  constructor(public globals: ThemeOptions) {
  }

  ngOnInit() {
    // this.userName = this.currentUser.name;
  }

}
