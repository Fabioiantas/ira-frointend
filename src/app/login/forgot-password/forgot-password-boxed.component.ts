import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-boxed',
  templateUrl: './forgot-password-boxed.component.html',
  styles: []
})
export class ForgotPasswordBoxedComponent implements OnInit {

  formGroup = new FormGroup({
    email: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthenticationService,
             private dialogBox: DialogBoxService,
             private router: Router) { }

  ngOnInit() {
  }

  recoverPass() {
    this.authService.recover(this.formGroup.value).subscribe(data => {
      console.log(JSON.stringify(data));
      this.dialogBox.show('Instruções de recuperação enviada para o e-mail informado.','WARNING');
        this.router.navigate(['/login']);
    });
  }

}
