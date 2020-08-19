import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../_services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogBoxService } from '../_services/dialog-box.service';

@Component({
  selector: 'app-login-boxed',
  templateUrl: './login-boxed.component.html',
  styles: []
})
export class LoginBoxedComponent implements OnInit {
  user = {email: '', password: ''};
  returnUrl: any = '';
  message: string;

  @ViewChild('loginBox') loginBoxTemplate;
  isLoading: any = false;

  constructor(private spinner: NgxSpinnerService,
              public modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: AuthenticationService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params.returnUrl ? params.returnUrl : '';
      this.message = params.message ?  params.message : '';
    });
    if (this.message) {
      this.dialogBox.show(this.message, 'ERROR');
    }
  }

  login() {
    this.isLoading = true;
    this.loginService.login(this.user).subscribe(data => {
      this.router.navigate([this.returnUrl && this.returnUrl !== '' ? this.returnUrl : '/']);
      this.isLoading = false;
    }, (error) => {
      alert(error.error);
      console.error(error);
      // this.modalService.open(this.loginBoxTemplate);
      this.isLoading = false;
    }
    );
  }

}
