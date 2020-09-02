import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FilterGee } from 'src/app/models/filter-gee';
import { FonteEmissora } from 'src/app/models/fonte-emissora';
import { Recurso } from 'src/app/models/recurso';
import { Propriedade } from 'src/app/models/propriedade';
import { Entidade } from 'src/app/models/entidade';
import { EntidadeService } from 'src/app/services/entidade.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { FonteEmissoraService } from 'src/app/services/fonte-emissora.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MonitoramentoRecursoService } from 'src/app/services/monitoramento-recurso.service';
import { MonitoramentoRecurso } from 'src/app/models/monitoramentoRecurso';
import { MonitoramentoRecursoAmostra } from 'src/app/models/monitoramentoRecursoAmostra';
import { ProcessoAnalise } from 'src/app/models/processoAnalise';
import { RecursoServiceService } from 'src/app/services/recurso-service.service';
import { ProcessoAnaliseService } from 'src/app/services/processo-analise.service';
import { MonitoramentoLaudo } from 'src/app/models/monitoramentoLaudo';
import { Router } from '@angular/router';

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
  filterForm: FormGroup;
  selected: any = [];
  produtoSelecionado = null;
  loading = false;

  entidades: Entidade;
  propriedades: Propriedade;
  recursos: Recurso;
  processos: ProcessoAnalise;
  fonteEmissoras: FonteEmissora;
  monitoramentoRecurso: MonitoramentoRecurso;
  laudos: MonitoramentoLaudo;
  rowsLaudo: any;
  laudo: MonitoramentoLaudo;
  filter:any;

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
              private dialogBox: DialogBoxService,
              private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      entidade: [null, Validators.required],
      propriedade: [null, Validators.required],
      recurso: [null, Validators.required],
      processo: [null, Validators.required],
      fonteEmissora: [null, Validators.required]
    });

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
  }

  create() {
    if (this.filterForm.valid) {
      this.loading = true;
      this.monitoramentoRecursoService.create(this.filterForm.value).subscribe(data => {
        this.loading = false;
        this.monitoramentoRecurso = data;
      }, () => this.loading = false);
    }
  }

 /* editarItem(amostra: MonitoramentoRecurso) {
    amostra.dt_amostra = moment(amostra.dt_amostra).format('DD/MM/YYYY');
    const initialState = {
      amostraGee: amostra,
      filteGee: this.filterForm.value,
      MonitoramentoGee: this.mon,
    };
    this.modalService.show(AmostraEditarComponent, { initialState, backdrop: 'static', class: 'modal-md'})
    .content.onClose.subscribe((amostraReturn: MonitoramentoRecursoAmostra) => {
      amostra = amostraReturn;
      this.findMonitoramento();
    });
  }*/

  /*removerAmostra(amostra: MonitoramentoRecursoAmostra) {
    this.dialogBox.show('Tem certeza que deseja remover a amostra?', 'Confirm').then((sim) => {
      if (sim) {
        this.loading = true;
        this.amostraGeeService.remover(amostra.id).subscribe(data => {
          this.loading = false;
          this.findMonitoramento();
        }, () => this.loading = false);
      }
    });
  }*/

  changeEntidade() {
    this.isAddEdit = false;
    this.propriedadeService.byEntidade(this.filterForm.value.entidade.entidade_id).subscribe((propriedades: Propriedade) => {
      this.propriedades = propriedades;
    });
  }

  changeFonteEmissora() {
    this.isAddEdit = false;
    if (this.filterForm.value.fonteEmissora.nm_classificacao === 'M') {
      this.filterForm.get('tipoCombustivel').clearValidators();
      this.filterForm.get('tipoCombustivel').updateValueAndValidity();
      this.showCombustivel = false;
      this.filterForm.get('tipoCombustivel').setValue(null);
      // this.findMonitoramento();
    } else {
      this.showCombustivel = true;
      this.filterForm.get('tipoCombustivel').setValidators([Validators.required]);
      this.filterForm.get('tipoCombustivel').updateValueAndValidity();
    }
  }

  /*closeEdit() {
    this.isAddEdit = false;
    this.amostras = new MonitoramentoRecursoAmostra();
  }*/

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

    this.monitoramentoRecursoService.createLaudo(this.laudo).subscribe(data => {
      this.loading = false;
      this.isAddEdit = false;
      this.laudo = new MonitoramentoLaudo;
      this.findLaudos();
    }, () => this.loading = false);
  }

  addAmostra($id: any) {
    this.router.navigate([`/monitoramento/amostra/${$id}`]);
  }

  findLaudos() {
    this.monitoramentoRecurso = null;
    if (this.filterForm.valid) {
      this.loading = true;
      this.monitoramentoRecursoService.findLaudos(this.filterForm.value).subscribe(data => {
        this.loading = false;
        if (data){
          this.monitoramentoRecurso = data.monitoramento;
          this.laudos = data.laudos;
          this.rowsLaudo = data.laudos;
        }
      });
    }
  }

  findAmostras(id: any) {
   /* this.amostraGeeService.findAmostra(id).subscribe(amostras => {
      this.amostrasGee = amostras;
    });*/
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      // this.router.navigate(['/fonteemissora/adicionar/' + $event.row.id]);
    }
  }

}
