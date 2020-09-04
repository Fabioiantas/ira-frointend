import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { MonitoramentoRecursoService } from 'src/app/services/monitoramento-recurso.service';
import { MonitoramentoRecursoAmostra } from 'src/app/models/monitoramentoRecursoAmostra';
import { Parametro } from 'src/app/models/parametro';
import { ParametroService } from 'src/app/services/parametro.service';

@Component({
  selector: 'app-monitoramento-amostra-cadastro',
  templateUrl: './monitoramento-amostra-cadastro.component.html',
  styleUrls: ['./monitoramento-amostra-cadastro.component.sass']
})
export class MonitoramentoAmostraCadastroComponent implements OnInit {
  fonte: any;
  params: any;
  isAddEdit = false;
  loading: boolean;
  amostras: MonitoramentoRecursoAmostra;
  amostraLaudo: MonitoramentoRecursoAmostra;
  parametrosList: any[];

  constructor(private monitoramentoService: MonitoramentoRecursoService,
              private parametroService: ParametroService,
              private route: ActivatedRoute,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaParametros();
    this.amostraLaudo = new MonitoramentoRecursoAmostra();
    this.route.params.subscribe(params => {
      this.params = params;
    });

    if (this.params.id) {
      this.populaTable(this.params.id);
    }
  }

inserirResultado() {
  this.isAddEdit = true;
}

cancelar() {
  this.isAddEdit = false;
}

populaParametros() {
  this.parametroService.list().subscribe(param => {
    this.parametrosList = param;
  });
  }

  populaTable(id: any) {
    this.monitoramentoService.findAmostras(this.params.id).subscribe(monitoramento => {
      this.amostras = monitoramento;
    });
  }

    addAmostra() {
    if (!this.amostraLaudo.dt_amostra || !this.amostraLaudo.cd_unidade_padrao || !this.amostraLaudo.parametro_id ||
      !this.amostraLaudo.dt_amostra || !this.amostraLaudo.ds_operador || !this.amostraLaudo.nr_padrao_inicial) {
      return this.dialogBox.show('É nescessário preencher todos os campos', 'Warning');
    }
    this.loading = true;
    this.amostraLaudo.monitoramento_laudo_id = this.params.id;
    this.monitoramentoService.createAmostra(this.amostraLaudo).subscribe(data => {
      this.loading = false;
      this.isAddEdit = false;
      this.amostraLaudo = new MonitoramentoRecursoAmostra();
      this.populaTable(this.params.id);
    }, () => this.loading = false);
  }
}
