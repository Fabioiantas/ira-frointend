import {Component, OnInit} from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { Router, NavigationEnd } from '@angular/router';
import * as moment from 'moment';
declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Portal Fármaco';

  constructor(public router: Router){
    setTheme('bs4');
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        window.dispatchEvent(new Event('resize'));
      }
    });
  }
}
