import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoLicenca } from 'src/app/models/TipoLicenca';


import { TipoLicencaService } from 'src/app/services/tipo-licenca.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

declare var $: any;

@Component({
  selector: 'app-tipo-licenca-cadastro',
  templateUrl: './tipo-licenca-cadastro.component.html',
  styleUrls: ['./tipo-licenca-cadastro.component.sass']
})
export class TipoLicencaCadastroComponent implements OnInit {
  formGroup = new FormGroup({
    id: new FormControl(''),
    nm_licenca: new FormControl('', Validators.required),
    nm_abreviado: new FormControl('', Validators.required),
    ds_informacao_licenca: new FormControl('', Validators.required)
  });

  tipoLicenca: TipoLicenca = new TipoLicenca();
  params: any;
  isLoading: any = false;

  id: any;
  nmLicenca: any;
  nmAbreviado: any;
  dsInformacaoLicenca: any;

  constructor(private tipoLicencaService: TipoLicencaService,
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
    });

    if (this.params.id) {
      this.tipoLicencaService.getById(this.params.id).subscribe(tipoLicenca => {
        this.tipoLicenca = tipoLicenca;
        this.formGroup.patchValue({
          id: tipoLicenca.id,
          nmLicenca: tipoLicenca.nm_licenca,
          nmAbreviado: tipoLicenca.nm_abreviado,
          dsInformacaoLicenca: tipoLicenca.ds_informacao_licenca
        });
      });
    }
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    console.log(this.formGroup.value.id);

    this.tipoLicencaService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Tipo Licença salva com sucesso!', 'OK');
      this.router.navigate(['/tipolicenca']);
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/tipolicenca']);
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

}
