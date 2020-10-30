import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Parametro } from 'src/app/models/Parametro';
import { UnidadeParametro } from 'src/app/models/unidadeParametro';
import { DataService } from 'src/app/services/data.service';
import { ParametroService } from 'src/app/services/parametro.service';
import { UnidadeParametroService } from 'src/app/services/unidade-parametro.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-unidade-parametro-cadastro',
  templateUrl: './unidade-parametro-cadastro.component.html',
  styleUrls: ['./unidade-parametro-cadastro.component.sass']
})
export class UnidadeParametroCadastroComponent implements OnInit {

  formGroup = new FormGroup({
    id: new FormControl(''),
    parametro_id: new FormControl('', Validators.required),
    cd_unidade_padrao: new FormControl('', Validators.required),
    ds_unidade_padrao: new FormControl('', Validators.required)
  });

  ListParametros: Parametro;
  unidadeParametro: UnidadeParametro = new UnidadeParametro();
  params: any;
  isLoading: any = false;

  id: any;
  nmUnidadeParametro: any;
  dsUnidadeParametro: any;

  registro: any;
  constructor(private unidadeParametroService: UnidadeParametroService,
              private parametroService: ParametroService,
              private dataService: DataService,
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    this.parametroService.list().subscribe(parametros => {
      this.ListParametros = parametros;
    });

    this.route.params.subscribe(data => {
      this.params = data;
    });

    if (this.params.id) {
      this.unidadeParametroService.getById(this.params.id).subscribe(unidadeParametro => {
        this.unidadeParametro = unidadeParametro;
        this.formGroup.patchValue({
          id: unidadeParametro.id,
          parametro_id: unidadeParametro.parametro_id,
          cd_unidade_padrao: unidadeParametro.cd_unidade_padrao,
          ds_unidade_padrao: unidadeParametro.ds_unidade_padrao
        });
      });
    } else {
      this.dataService.curParametro.subscribe(parametro => {
        if (parametro) {
          this.formGroup.patchValue({
            parametro_id: parametro.parametro_id
          });
        }
      });
    }
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    this.unidadeParametroService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Unidade salva com sucesso!', 'OK');
      this.router.navigate(['/unidade']);
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/unidade']);
  }

}
