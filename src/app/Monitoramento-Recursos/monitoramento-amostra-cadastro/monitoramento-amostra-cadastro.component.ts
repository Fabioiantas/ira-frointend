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
  isLoading = false;

  fonte: any;
  params: any;
  isAddEdit = false;
  isAddEditParam = false;

  isShowAmostras = true;
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
  amostraId: any;
  nrResultadoOld: string;

  listSafra = [
    { nr_safra: 20202020},
    { nr_safra: 20202021},
    { nr_safra: 20212021},
    { nr_safra: 20212022},
    { nr_safra: 20222022},
    { nr_safra: 20222023},
    { nr_safra: 20232023},
    { nr_safra: 20223024},
    { nr_safra: 20224024}
  ];

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
    this.loading = true;
    this.monitoramentoService.findAmostras(this.params.id).subscribe(data => {
      this.amostras = data.amostras;
      this.laudoAmostra = data;
      this.tipoMonitoramentoService.getTipoMonitoramentoById(this.laudoAmostra.tipo_monitoramento_id).subscribe(tipo => {
        this.tipoMonitoramento = tipo;
        this.loading = false;
      });
      this.monitoramentoService.getMonitoramentoById(this.laudoAmostra.monitoramento_id).subscribe(monitoramentoRecuso => {
        this.monitoramentoRecuso = monitoramentoRecuso;
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
    this.isShowTalhao = false;
    this.loading = true;
    this.nrAmostra = amostra.nr_amostra;
    this.dsAmostra =  amostra.ds_amostra;
    this.amostraId =  amostra.id;
    this.monitoramentoService.getResultadoAmostra(amostra.id).subscribe(resultadoAmostra => {
      this.resultadoAmostra = resultadoAmostra;
      this.showParametros();
      this.loading = false;
      this.isShowResultados = true;
      this.isShowAmostras = false;
    });
  }

  ShowAmostraTalhao(amostra: any) {
    this.data.changeAmostra(amostra);
    this.nrAmostra = amostra.nr_amostra;
    this.dsAmostra =  amostra.ds_amostra;
    this.amostraId = amostra.id;
    this.amostraTalhao = new AmostraTalhao();
    this.amostraTalhao.amostra_id = amostra.id;
    this.isShowTalhao = true;
    this.isAddEditParam = false;
    this.getAmostraTalhao(amostra.id);
  }

  getAmostraTalhao(id: any) {
    this.isLoading = true;
    this.isShowAmostras = false;
    this.monitoramentoService.getTalhaoByAmostra(id).subscribe(data => {
      this.talhoesAmostra = data.talhoes;
    });
    this.isLoading = false;
  }

  addAmostraTalhao() {
    this.isAddTalhao = true;
    this.amostraTalhao = new AmostraTalhao();
    this.monitoramentoService.getTalhaoByPropriedade(this.monitoramentoRecuso.propriedade.id).subscribe(data => {
      this.listAmostraTalhao = data.talhoes;
    });
  }

  salvarAmostraTalhao() {
    this.isLoading = true;
    this.data.currentAmostra.subscribe(amostra => {
      this.amostraTalhao.amostra_id = amostra.id;
    });
    this.monitoramentoService[this.amostraTalhao.id ? 'editAmostraTalhao' : 'createAmostraTalhao'](this.amostraTalhao).subscribe(data => {
      this.dialogBox.show('Talhão adicionado com sucesso!', 'OK');
      this.isAddTalhao = false;
      this.getAmostraTalhao(this.amostraTalhao.amostra_id);
      this.isLoading = false;
    });
  }

  cancelarAmostraTalhao() {
    this.isAddTalhao = false;
  }

  editarAmostraTalhao(amostraTalhao: any) {
    this.addAmostraTalhao();
    this.amostraTalhao.id = amostraTalhao.id;
    this.amostraTalhao.nr_safra = amostraTalhao.nr_safra;
    this.amostraTalhao.talhao_id = amostraTalhao.talhao.id;
    this.isAddTalhao = true;
  }

  removerAmostraTalhao(amostraTalhao: any) {
    this.dialogBox.show('Confirma remoção do registro', 'CONFIRM').then((sim: any) => {
      if (sim) {
        this.monitoramentoService.removeAmostraTalhao(amostraTalhao.id).subscribe( data => {
          this.dialogBox.show(data.message, 'OK');
        });
        this.getAmostraTalhao(amostraTalhao.amostra_id);
      }
    });
  }

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
    this.populaTable(this.params.id);
    this.isShowResultados = false;
    this.isShowAmostras = true;
    this.isAddEditParam = false;
    this.isAddEditResultB = false;
    this.isShowTalhao = false;
    this.isAddTalhao = false;
  }

  editResultado() {
    this.isAddEditResult = true;
  }

  salvarResultado() {
    this.isLoading = true;
    // tslint:disable-next-line:no-string-literal
    this.monitoramentoService.putResultado(this.resultadoAmostra).subscribe(data => {
      this.dialogBox.show('Resultado(s) salvo(s) com sucesso!', 'OK');
      this.isLoading = false;
      this.populaTable(this.params.id);
      this.isAddEditResult = false;
      this.isAddEditResultB = false;
    });
  }

  cancelarResultado() {
    this.isAddEditResult = false;
    this.isAddEditResultB = false;
  }

  oldResultado(event: any) {
    this.nrResultadoOld = event.target.textContent;
  }
}

