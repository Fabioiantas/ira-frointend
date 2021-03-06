import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrls: ['./adicionar-usuario.component.sass']
})
export class AdicionarUsuarioComponent implements OnInit {

  formGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    email: new FormControl('', Validators.email),
    situacao: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  params: any;
  isLoading: any = false;

  constructor(private usuarioService: UsuarioService, private dialogBox: DialogBoxService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.route.params.subscribe(data => {
      this.params = data;
    });

    if (this.params.id) {
      this.usuarioService.getById(this.params.id).subscribe(usuario => {
        this.formGroup.patchValue({
          id: usuario.id,
          name: usuario.name,
          email: usuario.email,
          situacao: usuario.situacao,
          role: usuario.role,
          password: usuario.password
        });
      });
    }
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    this.isLoading = true;
    this.usuarioService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.isLoading = false;
      this.dialogBox.show('Usuario salvo com sucesso!', 'OK');
      this.router.navigate(['/usuario']);
    }, (err) => {
      this.isLoading = false;
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/usuario']);
  }
}
