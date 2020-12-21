import { ArquivoMonitoramentoRecursoComponent } from './../arquivo-monitoramento-recurso/arquivo-monitoramento-recurso.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { FonteEmissora } from 'src/app/models/fonte-emissora';
import { Recurso } from 'src/app/models/recurso';
import { Propriedade } from 'src/app/models/propriedade';
import { Entidade } from 'src/app/models/entidade';
import { EntidadeService } from 'src/app/services/entidade.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { FonteEmissoraService } from 'src/app/services/fonte-emissora.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { MonitoramentoRecursoService } from 'src/app/services/monitoramento-recurso.service';
import { MonitoramentoRecurso } from 'src/app/models/monitoramentoRecurso';
import { ProcessoAnalise } from 'src/app/models/processoAnalise';
import { RecursoServiceService } from 'src/app/services/recurso-service.service';
import { ProcessoAnaliseService } from 'src/app/services/processo-analise.service';
import { MonitoramentoLaudo } from 'src/app/models/monitoramentoLaudo';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterMonitoramentoRecurso } from 'src/app/models/filter-monitoramento-recurso';
import { DataService } from 'src/app/services/data.service';
import { TipoMonitoramentoService } from 'src/app/services/tipo-monitoramento.service';
import { TipoMonitoramento } from 'src/app/models/tipoMonitoramento';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-monitoramento-cadastro',
  templateUrl: './monitoramento-cadastro.component.html',
  styleUrls: ['./monitoramento-cadastro.component.sass']
})

export class MonitoramentoCadastroComponent implements OnInit {
  heading = 'Recursos Monitorados';
  subheading = 'Adicionar novo Monitoramento';
  icon = 'lnr lnr-earth';
  toggleMobileSidebar: any;

  model: any;
  searching = false;
  searchFailed = false;
  filterMonitoramento: FilterMonitoramentoRecurso = new FilterMonitoramentoRecurso();
  filterForm: FormGroup;
  selected: any = [];
  produtoSelecionado = null;
  loading = false;
  loadingC = false;
  params: any;

  entidades: Entidade;
  propriedades: Propriedade;
  recursos: Recurso;
  processos: ProcessoAnalise;
  fonteEmissoras: FonteEmissora;
  monitoramentoRecurso: MonitoramentoRecurso;
  laudos: MonitoramentoLaudo;
  rowsLaudo: any;
  laudo: MonitoramentoLaudo;
  listTipoMonitoramento: TipoMonitoramento;
  showCombustivel = false;
  isAddEdit = false;

  columnsLaudo = [
    {name : 'Data', prop : 'dt_laudo', width : '35%', selecionado: true},
    {name : 'N° Laudo', prop : 'nr_laudo', width : '20%', selecionado: false},
    {name : 'Empresa', prop : 'nm_empresa_responsavel', width : '20%', selecionado: false},
    {name : 'Descrição', prop : 'nm_monitoramento', width : '20%', selecionado: false}
  ];

  constructor(private entidadeService: EntidadeService,
              private propriedadeService: PropriedadeService,
              private fonteEmissoraService: FonteEmissoraService,
              private monitoramentoRecursoService: MonitoramentoRecursoService,
              private recursoService: RecursoServiceService,
              private processoService: ProcessoAnaliseService,
              private tipoMonitoramentoService: TipoMonitoramentoService,
              private data: DataService,
              private dialogBox: DialogBoxService,
              private bsModalService: BsModalService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.params = param;
    });

    this.data.currentFilter.subscribe(filter => {
      if (filter) {
        this.filterMonitoramento = filter.value;
      }
    });

    if (this.filterMonitoramento) {
      this.filterForm = this.formBuilder.group({
        entidade: [this.filterMonitoramento.entidade, Validators.required],
        propriedade: [this.filterMonitoramento.propriedade, Validators.required],
        recurso: [this.filterMonitoramento.recurso, Validators.required],
        processo: [this.filterMonitoramento.processo, Validators.required],
        fonteEmissora: [this.filterMonitoramento.fonteEmissora, Validators.required]
      });
      this.findLaudos();
    } else {
      this.filterForm = this.formBuilder.group({
        entidade: [null, Validators.required],
        propriedade: [null, Validators.required],
        recurso: [null, Validators.required],
        processo: [null, Validators.required],
        fonteEmissora: [null, Validators.required]
      });
    }
    this.entidadeService.listaEntidades().subscribe((entidades: Entidade) => {
      this.entidades = entidades;
    });

    this.fonteEmissoraService.list().subscribe((fonte: FonteEmissora) => {
      this.fonteEmissoras = fonte;
    });

    this.recursoService.list().subscribe((recurso: Recurso) => {
      this.recursos = recurso;
    });

    this.processoService.list().subscribe((processo: ProcessoAnalise) => {
      this.processos = processo;
    });

    this.tipoMonitoramentoService.getList().subscribe(data => {
      this.listTipoMonitoramento = data;
    });

  }

  create() {
    this.laudo = new MonitoramentoLaudo();
    if (this.filterForm.valid) {
      this.loading = true;

      this.monitoramentoRecursoService.create(this.filterForm.value).subscribe(data => {
        this.loading = false;
        this.monitoramentoRecurso = data;
        this.isAddEdit = true;
      }, () => this.loading = false);
    }
  }

  editarLaudo(laudo: any) {
    this.laudo = new MonitoramentoLaudo();
    this.laudo.id = laudo.id;
    this.laudo.monitoramento_id = laudo.monitoramento_id;
    this.laudo.nm_empresa_responsavel = laudo.nm_empresa_responsavel;
    this.laudo.nm_monitoramento = laudo.nm_empresa_responsavel;
    this.laudo.nr_laudo = laudo.nr_laudo;
    this.laudo.dt_laudo = new Date(moment(laudo.dt_laudo).format('DD/MM/YYYY'));
    this.isAddEdit = true;
  }

  changeFilterService() {
    this.data.changeFilter(this.filterForm);
  }

  changeEntidade() {
    this.isAddEdit = false;
    this.data.changeFilter(null);
    this.propriedadeService.byEntidade(this.filterForm.value.entidade.entidade_id).subscribe((propriedades: Propriedade) => {
      this.propriedades = propriedades;
    });
  }

  changeFilter() {
    this.rowsLaudo = null;
    this.laudos = new MonitoramentoLaudo();
    this.monitoramentoRecurso = null;
    this.data.changeFilter(null);
  }

  changePropriedade() {
    this.data.changeFilter(null);
  }
  changeRecurso() {
    this.data.changeFilter(null);
  }
  changeProcesso() {
    this.data.changeFilter(null);
  }

  closeEdit() {
    this.isAddEdit = false;
    this.laudo = new MonitoramentoLaudo();
  }

  add() {
    this.laudo = new MonitoramentoLaudo();
    this.isAddEdit = true;
  }

  addLaudo() {
    if (!this.laudo.dt_laudo || !this.laudo.nr_laudo) {
      return this.dialogBox.show('É nescessário preencher todos os campos', 'Warning');
    }
    this.loading = true;
    this.laudo.monitoramento_id = this.monitoramentoRecurso.id;

    this.monitoramentoRecursoService[this.laudo.id ? 'editLaudo' : 'createLaudo'](this.laudo).subscribe(() => {
      this.loading = false;
      this.isAddEdit = false;
      this.laudo = new MonitoramentoLaudo();
      this.findLaudos();
    }, () => this.loading = false);
  }

  removeLaudo(id: any) {
    this.dialogBox.show('Confirma remoção do Laudo e todos seus Resultados?', 'CONFIRM').then(sim => {
      if (sim) {
        this.monitoramentoRecursoService.removeLaudo(id).subscribe(() => {
          this.dialogBox.show('Laudo removido com sucesso!', 'OK');
          this.findLaudos();
        });
      }
    });
  }

  addAmostra($laudo: any) {
    this.data.changeLaudo($laudo);
    this.router.navigate([`/monitoramento/amostra/${$laudo.id}`]);
  }

  findLaudos() {
    this.monitoramentoRecurso = null;
    if (this.filterForm.valid) {
      this.data.changeFilter(this.filterForm);
      this.loading = true;
      this.monitoramentoRecursoService.findLaudos(this.filterForm.value).subscribe(data => {
        this.loading = false;
        if (data) {
          this.monitoramentoRecurso = data.monitoramento;
          this.laudos = data.laudos;
          this.rowsLaudo = data.laudos;
        }
      });
    }
  }

  findAmostras() {
   /* this.amostraGeeService.findAmostra(id).subscribe(amostras => {
      this.amostrasGee = amostras;
    });*/
  }

  cleanFilter() {
    this.loadingC = true;
    this.filterForm.reset();
    this.rowsLaudo = null;
    this.monitoramentoRecurso = null;
    this.loadingC = false;
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      // this.router.navigate(['/fonteemissora/adicionar/' + $event.row.id]);
    }
  }

  anexo(laudo: any, monitoramento: any) {
    console.log(JSON.stringify(laudo));
    if (!laudo) { alert('selecione um Laudo!'); return; }
    const initialState = {
      laudo,
      monitoramento

    };
    this.bsModalService.show(ArquivoMonitoramentoRecursoComponent, { initialState, backdrop: 'static', class: 'modal-lg'})
    .content.onClose.subscribe(itemReturn => {
    });
  }
}

