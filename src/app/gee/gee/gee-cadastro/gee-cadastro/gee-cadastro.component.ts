import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { DialogBoxService } from './../../../../_services/dialog-box.service';
import { FonteEmissao } from './../../../../models/fonteEmissao';
import { EscopoGee } from './../../../../models/escopoGee';
import { FilterGee } from './../../../../models/filter-gee';
import { EntidadeService } from 'src/app/services/entidade.service';
import { Entidade } from 'src/app/models/entidade';
import { Propriedade } from 'src/app/models/propriedade';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { FonteEmissaoService } from 'src/app/services/fonte-emissao.service';
import { CombustivelService } from 'src/app/services/combustivel.service';
import { TipoCombustivel } from 'src/app/models/tipoCombustivel';
import { EscopoGeeService } from 'src/app/services/escopo-gee.service';
import { MonitoramentoGeeService } from 'src/app/services/monitoramento-gee.service';
import { MonitoramentoGee } from 'src/app/models/monitoramentoGee';
import { AmostraService } from 'src/app/services/amostra.service';
import { AmostraGee } from 'src/app/models/amostraGee';

@Component({
  selector: 'app-gee-cadastro',
  templateUrl: './gee-cadastro.component.html',
  styleUrls: ['./gee-cadastro.component.sass']
})
export class GeeCadastroComponent implements OnInit {

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

  escopos: EscopoGee;
  entidades: Entidade;
  propriedades: Propriedade;
  fonteEmissoes: FonteEmissao;
  combustiveis: TipoCombustivel;
  monitoramentoGee: MonitoramentoGee;
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

  changeEntidade() {
    this.propriedadeService.byEntidade(this.filterForm.value.entidade.entidade_id).subscribe((propriedades: Propriedade) => {
      this.propriedades = propriedades;
    });
  }

  changeFonteEmissao() {
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
    this.isAddEdit = true;
    this.amostras = new AmostraGee();
  }

  addItem() {
    if (!this.amostras.dt_amostra || !this.amostras.cd_unidade_padrao || !this.amostras.qt_consumo_total) {
      return this.dialogBox.show('É nescessário preencher todos os campos', 'Warning');
    }
    this.loading = true;
    this.amostras.monitoramento_gee_id = this.monitoramentoGee.id;

    this.amostras.dt_amostra = moment(this.amostras.dt_amostra).format('YYYY-MM-DD');
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
      console.log('a: ' + this.amostrasGee);
    });
  }

}
