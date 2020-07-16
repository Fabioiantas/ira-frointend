import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {

  formGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password_confirmation: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthenticationService,
              private dialogBox: DialogBoxService,
              private router: Router) { }

  ngOnInit() {
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
