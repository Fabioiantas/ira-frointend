import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Parametro } from 'src/app/models/Parametro';
import { TipoMonitoramento } from 'src/app/models/tipoMonitoramento';
import { TipoMonitoramentoParametros } from 'src/app/models/tipoMonitoramentoParametro';
import { UnidadeParametro } from 'src/app/models/unidadeParametro';
import { ParametroService } from 'src/app/services/parametro.service';
import { TipoMonitoramentoParamService } from 'src/app/services/tipo-monitoramento-param.service';
import { TipoMonitoramentoService } from 'src/app/services/tipo-monitoramento.service';
import { UnidadeParametroService } from 'src/app/services/unidade-parametro.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-monitoramento-parametros',
  templateUrl: './monitoramento-parametros.component.html',
  styleUrls: ['./monitoramento-parametros.component.sass']
})
export class MonitoramentoParametrosComponent implements OnInit {

  listTipoMonitoramento: TipoMonitoramento;
  listParametro: Parametro;
  listUnidadeParametro: UnidadeParametro;
  tipoMonitoramentoParam: TipoMonitoramentoParametros;

  formGroup = new FormGroup({
    id: new FormControl(''),
    tipo_monitoramento_id: new FormControl('', Validators.required),
    parametro_id: new FormControl('', Validators.required),
    unidade_parametro_id: new FormControl('', Validators.required),
    ds_operador: new FormControl('', Validators.required),
    nr_padrao_inicial: new FormControl('', Validators.required),
    nr_padrao_final: new FormControl(''),
    nr_peso: new FormControl('')
  });

  listOperadores: Array<any> = [
    { ds_operador: 'MAIOR', nm_operador: 'MAIOR' },
    { ds_operador: 'MENOR', nm_operador: 'MENOR' },
    { ds_operador: 'ENTRE', nm_operador: 'ENTRE' }
  ];

  constructor(private tipoMonitoramentoParamService: TipoMonitoramentoParamService,
              private tipoMonitoramentoService: TipoMonitoramentoService,
              private unidadeParametroService: UnidadeParametroService,
              private parametroService: ParametroService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.getTipoMonitoramento();
    this.getParametros();
  }

  getTipoMonitoramento() {
    this.tipoMonitoramentoService.listar().subscribe(data => {
      this.listTipoMonitoramento = data;
    });
  }

  changeTipoMonitoramento() {
    if (!this.formGroup.value.tipo_monitoramento_id) {
      this.tipoMonitoramentoParam  = null;
      return;
    } else {
      this.tipoMonitoramentoService.getParamByTipoMonitoramentoId(this.formGroup.value.tipo_monitoramento_id).subscribe(data => {
        this.tipoMonitoramentoParam = data.monitoramento_params;
        console.log(JSON.stringify(this.tipoMonitoramentoParam));
      });
    }
  }

  getParametros() {
    this.parametroService.listar().subscribe(data => {
      this.listParametro = data;
    });
  }

  changeParametroList() {
    this.formGroup.patchValue({
      unidade_parametro_id: null
    });
    this.unidadeParametroService.getListUnidadeByParametroId(this.formGroup.value.parametro_id).subscribe(data => {
      this.listUnidadeParametro = data.unidades;
    });
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    this.tipoMonitoramentoParamService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(data => {
      this.dialogBox.show('Parametro salvo com sucesso!', 'OK');
      this.changeTipoMonitoramento();
      this.formGroup.reset();
    });
  }

  cancelar() {
    this.formGroup.reset();
  }
}
