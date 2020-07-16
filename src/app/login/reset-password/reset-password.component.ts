import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { DateAdapter } from 'angular-calendar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  token: any;
  formGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password_confirmation: new FormControl('', Validators.required),
    token: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthenticationService,
              private dialogBox: DialogBoxService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.token = data.token;
      this.formGroup.patchValue({
        token: data.token
      });
    });
  }

  ResetPassword() {
    this.authService.resetPassword(this.formGroup.value).subscribe(
      result => {
        this.dialogBox.show('Senha Alterada com sucesso!','WARNING');
        this.formGroup.reset();
      }
    );
  }

}
