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
  filter: FilterGee = new FilterGee();
  produtoSelecionado = null;
  loading = false;

  entidades: Entidade;
  propriedades: Propriedade;
  recursos: Recurso;
  processos: ProcessoAnalise;
  fonteEmissoras: FonteEmissora;
  monitoramentoRecurso: MonitoramentoRecurso;

  showCombustivel = false;
  isAddEdit = false;


  constructor(private entidadeService: EntidadeService,
              private propriedadeService: PropriedadeService,
              private fonteEmissoraService: FonteEmissoraService,
              private monitoramentoRecursoService: MonitoramentoRecursoService,
              private recursoService: RecursoServiceService,
              private processoService: ProcessoAnaliseService,
              private dialogBox: DialogBoxService,
              private modalService: BsModalService,
              private formBuilder: FormBuilder) { }

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

    this.fonteEmissoraService.listar().subscribe((fonte: FonteEmissora) => {
      this.fonteEmissoras = fonte;
    });

    this.recursoService.listar().subscribe((recurso: Recurso) => {
      this.recursos = recurso;
    });

    this.processoService.listar().subscribe((processo: ProcessoAnalise) => {
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

  /*add() {
    this.amostras = new MonitoramentoRecursoAmostra();
    this.amostras.cd_unidade_padrao = this.filterForm.value.fonteEmissora.cd_unidade_calculo;
    this.isAddEdit = true;
  }*/

  /*addItem() {
    if (!this.amostras.dt_amostra || !this.amostras.cd_unidade_padrao || !this.amostras.qt_consumo_total) {
      return this.dialogBox.show('É nescessário preencher todos os campos', 'Warning');
    }
    this.loading = true;
    this.amostras.monitoramento_gee_id = this.monitoramentoGee.id;

    this.amostraGeeService.salvar(this.amostras).subscribe(data => {
      this.loading = false;
      this.isAddEdit = false;
      this.amostras = new MonitoramentoRecursoAmostra();
      this.findMonitoramento();
    }, () => this.loading = false);
  }*/

  findLaudos() {
    this.monitoramentoRecurso = null;
    if (this.filterForm.valid) {
      this.loading = true;
      this.monitoramentoRecursoService.findLaudos(this.filterForm.value).subscribe(data => {
        this.loading = false;
        this.monitoramentoRecurso = data;
        this.findAmostras(this.monitoramentoRecurso.id);
      });
    }
  }

  findAmostras(id: any) {
   /* this.amostraGeeService.findAmostra(id).subscribe(amostras => {
      this.amostrasGee = amostras;
    });*/
  }

}
