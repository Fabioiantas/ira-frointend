import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-forgot-password-boxed',
  templateUrl: './forgot-password-boxed.component.html',
  styles: []
})
export class ForgotPasswordBoxedComponent implements OnInit {

  formGroup = new FormGroup({
    email: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  recoverPass() {
    this.authService.recover(this.formGroup.value).subscribe(data => {
      console.log(JSON.stringify(data));
    });
  }

}
