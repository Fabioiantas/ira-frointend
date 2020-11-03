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

  isEdit = false;

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
        this.tipoMonitoramentoParam = data;
        console.log('this.tipoMonitoramentoParam ' + JSON.stringify(this.tipoMonitoramentoParam));
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
    this.getUnidadeParamList();
  }

  getUnidadeParamList() {
    this.unidadeParametroService.getListUnidadeByParametroId(this.formGroup.value.parametro_id).subscribe(data => {
      this.listUnidadeParametro = data.unidades;
    });
  }

  inserir() {
    if (!this.formGroup.value.tipo_monitoramento_id) {
      this.formGroup.reset();
    } else {
      this.formGroup.patchValue({
        parametro_id: null,
        unidade_parametro_id: null,
        ds_operador: null,
        nr_padrao_inicial: null,
        nr_padrao_final: null
      });
    }
    this.isEdit = true;
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    this.tipoMonitoramentoParamService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(data => {
      this.dialogBox.show('Parametro salvo com sucesso!', 'OK');
      this.isEdit = false;
      this.changeTipoMonitoramento();
    });
  }

  editar(param: any) {
    this.getParametros();
    this.formGroup.reset();
    this.formGroup.patchValue({
      parametro_id: param.parametro_id
    });
    this.unidadeParametroService.getListUnidadeByParametroId(this.formGroup.value.parametro_id).subscribe(data => {
      this.listUnidadeParametro = data.unidades;
    });
    if (!param) { return; }
    this.formGroup.patchValue({
      id: param.id,
      tipo_monitoramento_id: param.tipo_monitoramento_id,
      // parametro_id: param.parametro_id,
      unidade_parametro_id: param.unidade_parametro_id,
      ds_operador: param.ds_operador,
      nr_padrao_inicial: param.nr_padrao_inicial,
      nr_padrao_final: param.nr_padrao_final,
      nr_peso: param.nr_peso
    });
    this.isEdit = true;
  }

  remover(item: any) {
    if (!item) { return; }
    this.dialogBox.show('Confirma remocao do parametro?', 'CONFIRM').then(sim => {
      if (sim) {
        this.tipoMonitoramentoParamService.remove(item.id).subscribe(data => {
          this.dialogBox.show('Parametro removido com sucesso!', 'OK');
          this.changeTipoMonitoramento();
        });
      }
    });
  }

  cancelar() {
    this.formGroup.reset();
    this.isEdit = false;
    this.tipoMonitoramentoParam = null;
  }
}
