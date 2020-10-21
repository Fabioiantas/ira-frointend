import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entidade } from 'src/app/models/entidade';
import { FilterTalhao } from 'src/app/models/filtertalhao';
import { Propriedade } from 'src/app/models/propriedade';
import { Talhao } from 'src/app/models/talhao';
import { DataService } from 'src/app/services/data.service';
import { EntidadeService } from 'src/app/services/entidade.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { TalhaoService } from 'src/app/services/talhao.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-monitoramento-talhao',
  templateUrl: './monitoramento-talhao.component.html',
  styleUrls: ['./monitoramento-talhao.component.sass']
})
export class MonitoramentoTalhaoComponent implements OnInit {

  heading = 'Recursos Monitorados';
  subheading = 'Adicionar novo Monitoramento';
  icon = 'lnr lnr-earth';
  toggleMobileSidebar: any;

  talhao: Talhao;
  rowsTalhao: any;
  model: any;
  searching = false;
  searchFailed = false;
  filterTalhao: FilterTalhao = new FilterTalhao();
  filterForm: FormGroup;
  selected: any = [];
  produtoSelecionado = null;
  loading = false;
  loadingC = false;
  params: any;

  entidades: Entidade;
  propriedades: Propriedade;
  rowsLaudo: any;
  showCombustivel = false;
  isAddEdit = false;

  columnsTalhao = [
    {name : 'Nome', prop : 'nm_talhao', width : '35%', selecionado: true},
    {name : 'Area Agricultavel', prop : 'qt_area_agricultavel', width : '20%', selecionado: false},
    {name : 'Situacao', prop : 'ie_situacao', width : '20%', selecionado: false}
  ];

  constructor(private entidadeService: EntidadeService,
              private propriedadeService: PropriedadeService,
              private talhaoService: TalhaoService,
              private data: DataService,
              private dialogBox: DialogBoxService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.params = param;
    });
    this.filterForm = this.formBuilder.group({
        entidade: [this.filterTalhao.entidade, Validators.required],
        propriedade: [this.filterTalhao.propriedade, Validators.required]
    });
    this.entidadeService.listaEntidades().subscribe((entidades: Entidade) => {
      this.entidades = entidades;
    });
  }

  create() {
    // this.laudo = new MonitoramentoLaudo();
    // if (this.filterForm.valid) {
    //   this.loading = true;

    //   this.monitoramentoRecursoService.create(this.filterForm.value).subscribe(data => {
    //     this.loading = false;
    //     this.monitoramentoRecurso = data;
    //     this.isAddEdit = true;
    //   }, () => this.loading = false);
    // }
  }

  editarLaudo(laudo: any) {
    // this.laudo = new MonitoramentoLaudo();
    // this.laudo.id = laudo.id;
    // this.laudo.monitoramento_id = laudo.monitoramento_id;
    // this.laudo.nm_empresa_responsavel = laudo.nm_empresa_responsavel;
    // this.laudo.nm_monitoramento = laudo.nm_empresa_responsavel;
    // this.laudo.nr_laudo = laudo.nr_laudo;
    // this.laudo.dt_laudo = new Date(moment(laudo.dt_laudo).format("DD/MM/YYYY"));
    // this.isAddEdit = true;
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
    // this.rowsLaudo = null;.
    // this.laudos = new MonitoramentoLaudo();
    // this.monitoramentoRecurso = null;
    // this.data.changeFilter(null);
  }

  changePropriedade() {
    this.findTalhoes();
    // this.data.changeFilter(null);
  }

  findTalhoes() {
    this.talhao = null;
    if (this.filterForm.valid) {
      this.loading = true;
      console.log(JSON.stringify(this.findTalhoes));
      this.talhaoService.findTalhoesPropriedade(1).subscribe(data => {
        this.loading = false;
        this.talhao = data;
        this.rowsTalhao = data;
        console.log('tal: ' + this.talhao);
      });
    }
  }

  closeEdit() {
    // this.isAddEdit = false;
    // this.laudo = new MonitoramentoLaudo();
  }

  add() {
    // this.laudo = new MonitoramentoLaudo();
    // this.isAddEdit = true;
  }

  addLaudo() {
    // if (!this.laudo.dt_laudo || !this.laudo.nr_laudo) {
    //   return this.dialogBox.show('É nescessário preencher todos os campos', 'Warning');
    // }
    // this.loading = true;
    // this.laudo.monitoramento_id = this.monitoramentoRecurso.id;

    // this.monitoramentoRecursoService[this.laudo.id ? 'editLaudo' : 'createLaudo'](this.laudo).subscribe(data => {
    //   this.loading = false;
    //   this.isAddEdit = false;
    //   this.laudo = new MonitoramentoLaudo();
    //   this.findLaudos();
    // }, () => this.loading = false);
  }

  removeLaudo(id: any) {
    // this.dialogBox.show('Confirma remoção do Laudo e todos seus Resultados?', 'CONFIRM').then(sim => {
    //   if (sim) {
    //     this.monitoramentoRecursoService.removeLaudo(id).subscribe(data => {
    //       this.dialogBox.show('Laudo removido com sucesso!', 'OK');
    //       this.findLaudos();
    //     });
    //   }
    // });
  }

  addAmostra($laudo: any) {
    // this.data.changeLaudo($laudo);
    // this.router.navigate([`/monitoramento/amostra/${$laudo.id}`]);
  }

  findLaudos() {
    // this.monitoramentoRecurso = null;
    // if (this.filterForm.valid) {
    //   this.data.changeFilter(this.filterForm);
    //   this.loading = true;
    //   this.monitoramentoRecursoService.findLaudos(this.filterForm.value).subscribe(data => {
    //     this.loading = false;
    //     if (data) {
    //       this.monitoramentoRecurso = data.monitoramento;
    //       this.laudos = data.laudos;
    //       this.rowsLaudo = data.laudos;
    //     }
    //   });
    // }
  }

  findAmostras(id: any) {
   /* this.amostraGeeService.findAmostra(id).subscribe(amostras => {
      this.amostrasGee = amostras;
    });*/
  }

  cleanFilter() {
    // this.loadingC = true;
    // this.filterForm.reset();
    // this.rowsLaudo = null;
    // this.monitoramentoRecurso = null;
    // this.loadingC = false;
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      // this.router.navigate(['/fonteemissora/adicionar/' + $event.row.id]);
    }
  }

}
