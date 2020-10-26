import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import * as moment from 'moment';
import { FilterMonitoramentoRecurso } from 'src/app/models/filter-monitoramento-recurso';
import { DataService } from 'src/app/services/data.service';
import { MonitoramentoRecursoService } from 'src/app/services/monitoramento-recurso.service';
import { MonitoramentoRecursoAmostra } from 'src/app/models/monitoramentoRecursoAmostra';
import { ParametroService } from 'src/app/services/parametro.service';
import { MonitoramentoLaudo } from 'src/app/models/monitoramentoLaudo';
import { TipoMonitoramento } from 'src/app/models/tipoMonitoramento';
import { TipoMonitoramentoService } from 'src/app/services/tipo-monitoramento.service';
import { AmostraTalhao } from 'src/app/models/amostraTalhao';

@Component({
  selector: 'app-monitoramento-amostra-cadastro',
  templateUrl: './monitoramento-amostra-cadastro.component.html',
  styleUrls: ['./monitoramento-amostra-cadastro.component.sass']
})
export class MonitoramentoAmostraCadastroComponent implements OnInit {
  fonte: any;
  params: any;
  isAddEdit = false;
  isAddEditParam = false;

  isShowAmostras = false;
  isShowResultados = false;
  isEditResultaos = false;

  isShowTalhao = false;
  isAddEditTalhao = false;
  isAddTalhao = false;

  talhoesAmostra: any[] = [];
  listAmostraTalhao: any[] = [];
  amostraTalhao: AmostraTalhao;

  isAddEditResult = false;
  isAddEditResultB = false;

  loading: boolean;

  monitoramentoRecuso: any;

  tipoMonitoramento: TipoMonitoramento;
  amostras: MonitoramentoRecursoAmostra;
  amostraLaudo: MonitoramentoRecursoAmostra;
  laudoAmostra: any;
  resultadoAmostra: any[] = [];
  laudo: MonitoramentoLaudo;
  parametrosList: any[];
  nrAmostra: string;
  dsAmostra: string;
  nrResultadoOld: string;

  constructor(private tipoMonitoramentoService: TipoMonitoramentoService,
              private monitoramentoService: MonitoramentoRecursoService,
              private parametroService: ParametroService,
              private data: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private dialogBox: DialogBoxService) {
  }

  ngOnInit() {
   // this.populaParametros();
    this.route.params.subscribe(param => {
      this.params = param;
    });
    if (this.params.id) {
      this.populaTable(this.params.id);
    }
    this.data.currentLaudo.subscribe(laudo => {
      this.laudo = laudo;
    });
  }

  inserirAmostra() {
    this.amostraLaudo = new MonitoramentoRecursoAmostra();
    this.isAddEdit = true;
  }

  editarItem(resultado: MonitoramentoRecursoAmostra) {
    this.amostraLaudo = new MonitoramentoRecursoAmostra();
    this.amostraLaudo.id = resultado.id;
    this.amostraLaudo.nr_amostra = resultado.nr_amostra;
    this.amostraLaudo.dt_amostra =  new Date(moment(resultado.dt_amostra).format('DD/MM/YYYY'));
    this.amostraLaudo.ds_amostra = resultado.ds_amostra;
    this.isAddEdit = true;
  }

  delete() {
    // this.monitoramentoService
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
    this.monitoramentoService.findAmostras(this.params.id).subscribe(data => {
      this.amostras = data.amostras;
      this.laudoAmostra = data;
      this.tipoMonitoramentoService.getTipoMonitoramentoById(this.laudoAmostra.tipo_monitoramento_id).subscribe(tipo => {
        this.tipoMonitoramento = tipo;
      });
      this.monitoramentoService.getMonitoramentoById(this.laudoAmostra.monitoramento_id).subscribe(data => {
        this.monitoramentoRecuso = data;
        console.log('data ' + JSON.stringify(this.monitoramentoRecuso.entidade));
      });
    });
  }

  addAmostra() {
    if (!this.amostraLaudo.nr_amostra || !this.amostraLaudo.dt_amostra) {
      return this.dialogBox.show('É nescessário preencher o número e data da amostra', 'Warning');
    }
    this.loading = true;
    this.amostraLaudo.monitoramento_laudo_id = this.params.id;

    this.monitoramentoService[this.amostraLaudo.id ? 'editAmostraLaudo' : 'createAmostra'](this.amostraLaudo).subscribe(data => {
      this.loading = false;
      this.isAddEdit = false;
      this.amostraLaudo = new MonitoramentoRecursoAmostra();
      this.populaTable(this.params.id);
    }, () => this.loading = false);
  }

  removerAmostra(id: any) {
    this.dialogBox.show('Confirma remoção da Amostra e todos seus resultados?', 'CONFIRM').then(sim => {
      if (sim) {
        this.monitoramentoService.removeResultado(id).subscribe(data => {
          this.dialogBox.show('Amostra removida com sucesso!', 'OK');
          this.populaTable(this.params.id);
        });
      }
    });
  }

  getResultadoAmostra(amostra: any) {
    this.nrAmostra = amostra.nr_amostra;
    this.dsAmostra =  amostra.ds_amostra;
    this.monitoramentoService.getResultadoAmostra(amostra.id).subscribe(resultadoAmostra => {
      this.resultadoAmostra = resultadoAmostra;
      this.showParametros();
      this.isShowResultados = true;
      this.isShowAmostras = true;
    });
  }

  getAmostraTalhao(amostra: any) {
    this.nrAmostra = amostra.nr_amostra;
    this.dsAmostra =  amostra.ds_amostra;
    this.isShowTalhao = true;
    this.isAddEditParam = false;
    this.monitoramentoService.getTalhaoByAmostra(amostra.id).subscribe(data => {
      this.talhoesAmostra = data.talhoes;
    });
  }

  addAmostraTalhao() {
    this.isAddTalhao = true;
    this.amostraTalhao = new AmostraTalhao();
    this.monitoramentoService.getTalhaoByPropriedade(1).subscribe(data => {
      this.listAmostraTalhao = data.talhoes;
      console.log(JSON.stringify(this.amostraTalhao));
    });
  }

  // getTalhaoByPropriedade() {
  //   this.monitoramentoService.getTalhaoByPropriedade()
  // }

  showParametros() {
    this.isAddEditParam = true;
  }

  closeEdit() {
    this.isAddEditResult = false;
  }

  monitoramento() {
    this.router.navigate(['/monitoramento']);
  }

  showAmostras() {
    this.isShowResultados = false;
    this.isShowAmostras = true;
    this.isAddEditParam = false;
    this.isAddEditResultB = false;
    this.isShowTalhao = false;
  }

  editResultado() {
    this.isAddEditResult = true;
  }

  salvarResultado() {
    // tslint:disable-next-line:no-string-literal
    this.monitoramentoService.putResultado(this.resultadoAmostra['resultados']).subscribe(data => {
      this.dialogBox.show('Resultado(s) salvo(s) com sucesso!', 'OK');
    });
    this.populaTable(this.params.id);
    this.isAddEditResult = false;
    this.isAddEditResultB = false;
  }

  cancelarResultado() {
    this.isAddEditResult = false;
    this.isAddEditResultB = false;
  }

  oldResultado(event: any) {
    this.nrResultadoOld = event.target.textContent;
  }
}

