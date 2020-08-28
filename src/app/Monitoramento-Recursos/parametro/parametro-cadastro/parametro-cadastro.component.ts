import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Parametro } from 'src/app/models/parametro';
import { ParametroService } from 'src/app/services/parametro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-parametro-cadastro',
  templateUrl: './parametro-cadastro.component.html',
  styleUrls: ['parametro-cadastro.component.sass']
})
export class ParametroCadastroComponent implements OnInit {

  formGroup = new FormGroup({
    id: new FormControl(''),
    nm_parametro: new FormControl('', Validators.required),
    sg_parametro: new FormControl('', Validators.required)
  });

  parametro: Parametro = new Parametro();
  params: any;
  isLoading: any = false;

  id: any;
  nmParametro: any;
  dsParametro: any;

  constructor(private recursoService: ParametroService,
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(data => {
      this.params = data;
    });
    if (this.params.id) {
      this.recursoService.getById(this.params.id).subscribe(parametro => {
        this.parametro = parametro;
        this.formGroup.patchValue({
          id: parametro.id,
          nmCampanha: parametro.nm_parametro,
          descCampanha: parametro.sg_parametro
        });
      });
    }
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    console.log(this.formGroup.value.id);

    this.recursoService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Parâmetro salvo com sucesso!', 'OK');
      this.router.navigate(['/parametro']);
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/recurso']);
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

}
