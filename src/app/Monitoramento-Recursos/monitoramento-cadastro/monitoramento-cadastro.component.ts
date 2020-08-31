import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterGee } from 'src/app/models/filter-gee';
import { FonteEmissora } from 'src/app/models/fonte-emissora';
import { Recurso } from 'src/app/models/recurso';
import { Propriedade } from 'src/app/models/propriedade';
import { Entidade } from 'src/app/models/entidade';

@Component({
  selector: 'app-monitoramento-cadastro',
  templateUrl: './monitoramento-cadastro.component.html',
  styleUrls: ['./monitoramento-cadastro.component.sass']
})
export class MonitoramentoCadastroComponent implements OnInit {
  heading = 'Fonte de Emissão GEE';
  subheading = 'Adicionar nova Fonte de Emissão.';
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
  recurso: Recurso;
  fonteEmissoras: FonteEmissora;
  monitoramentoRecurso: Monit
  amostrasGee: AmostraGee;
  amostras: AmostraGee;
  showCombustivel = false;
  isAddEdit = false;


  constructor(private entidadeService: EntidadeService,
              private propriedadeService: PropriedadeService,
              private fonteEmissaoService: FonteEmissaoService,
              private combustivelService: CombustivelService,
              private ecopoService: EscopoGeeService,
              private monitoramentoGeeService: MonitoramentoGeeService,
              private amostraGeeService: AmostraService,
              private dialogBox: DialogBoxService,
              private modalService: BsModalService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      escopo: [null, Validators.required],
      entidade: [null, Validators.required],
      propriedade: [null, Validators.required],
      fonteEmissao: [null, Validators.required],
      tipoCombustivel: [null, Validators.required]
    });

    this.ecopoService.getList().subscribe((escopos: EscopoGee) => {
      this.escopos = escopos;
    });

    this.entidadeService.listaEntidades().subscribe((entidades: Entidade) => {
      this.entidades = entidades;
    });

    this.fonteEmissaoService.getList().subscribe((fonteEmissoes: FonteEmissao) => {
      this.fonteEmissoes = fonteEmissoes;
    });

    this.combustivelService.getList().subscribe((combustiveis: TipoCombustivel) => {
      this.combustiveis = combustiveis;
    });

  }

  create() {
    if (this.filterForm.valid) {
      this.loading = true;
      this.monitoramentoGeeService.create(this.filterForm.value).subscribe(data => {
        this.loading = false;
        this.monitoramentoGee = data;
      }, () => this.loading = false);
    }
  }

  editarItem(amostra: AmostraGee) {
    // amostra.dt_amostra = moment(amostra.dt_amostra).format('DD/MM/YYYY');
    const initialState = {
      amostraGee: amostra,
      filteGee: this.filterForm.value,
      MonitoramentoGee: this.monitoramentoGee,
    };
    this.modalService.show(AmostraEditarComponent, { initialState, backdrop: 'static', class: 'modal-md'})
    .content.onClose.subscribe((amostraReturn: AmostraGee) => {
      amostra = amostraReturn;
      this.findMonitoramento();
    });
  }

  removerAmostra(amostra: AmostraGee) {
    this.dialogBox.show('Tem certeza que deseja remover a amostra?', 'Confirm').then((sim) => {
      if (sim) {
        this.loading = true;
        this.amostraGeeService.remover(amostra.id).subscribe(data => {
          this.loading = false;
          this.findMonitoramento();
        }, () => this.loading = false);
      }
    });
  }

  changeEntidade() {
    this.isAddEdit = false;
    this.propriedadeService.byEntidade(this.filterForm.value.entidade.entidade_id).subscribe((propriedades: Propriedade) => {
      this.propriedades = propriedades;
    });
  }

  changeFonteEmissao() {
    this.isAddEdit = false;
    if (this.filterForm.value.fonteEmissao.nm_classificacao === 'M') {
      this.filterForm.get('tipoCombustivel').clearValidators();
      this.filterForm.get('tipoCombustivel').updateValueAndValidity();
      this.showCombustivel = false;
      this.filterForm.get('tipoCombustivel').setValue(null);
      this.findMonitoramento();
    } else {
      this.showCombustivel = true;
      this.filterForm.get('tipoCombustivel').setValidators([Validators.required]);
      this.filterForm.get('tipoCombustivel').updateValueAndValidity();
    }
  }

  closeEdit() {
    this.isAddEdit = false;
    this.amostras = new AmostraGee();
  }

  add() {
    this.amostras = new AmostraGee();
    this.amostras.cd_unidade_padrao = this.filterForm.value.fonteEmissao.cd_unidade_calculo;
    this.isAddEdit = true;
  }

  addItem() {
    if (!this.amostras.dt_amostra || !this.amostras.cd_unidade_padrao || !this.amostras.qt_consumo_total) {
      return this.dialogBox.show('É nescessário preencher todos os campos', 'Warning');
    }
    this.loading = true;
    this.amostras.monitoramento_gee_id = this.monitoramentoGee.id;

    this.amostraGeeService.salvar(this.amostras).subscribe(data => {
      this.loading = false;
      this.isAddEdit = false;
      this.amostras = new AmostraGee();
      this.findMonitoramento();
    }, () => this.loading = false);
  }

  findMonitoramento() {
    this.monitoramentoGee = null;
    if (this.filterForm.valid) {
      this.loading = true;
      this.monitoramentoGeeService.findMonitoramento(this.filterForm.value).subscribe(data => {
        this.loading = false;
        this.monitoramentoGee = data;
        this.findAmostras(this.monitoramentoGee.id);
      });
    }
  }

  findAmostras(id: any) {
    this.amostraGeeService.findAmostra(id).subscribe(amostras => {
      this.amostrasGee = amostras;
    });
  }

  changeQuilometragem() {
     this.amostras.qt_consumo_total = this.amostras.qt_quilometragem_total / this.filterForm.value.fonteEmissao.qt_consumo;
  }

}
