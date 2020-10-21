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
              private dataService: DataService,
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

    this.dataService.currentFilterTalhao.subscribe(filter => {
      if (filter) {
        this.filterTalhao = filter.value;
      }
    });
    if (this.filterTalhao) {
      this.filterForm = this.formBuilder.group({
        entidade: [this.filterTalhao.entidade, Validators.required],
        propriedade: [this.filterTalhao.propriedade, Validators.required]
      });
      this.findTalhoes();
    }
  }

  addTalhao(){
    this.dataService.changeTalhaoFilter(this.filterForm.value);
    this.router.navigate(['/talhao/adicionar']);
  }

  editar(row: any) {
    if(!row) {
      this.dialogBox.show('Nehum talhão selecionado!', 'ERROR');
      return;
    }
    this.router.navigate(['/talhao/adicionar/' + row.id]);
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show("Confirma remoção do Talhão?","CONFIRM").then(sim=>{
        if(sim){
          this.talhaoService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Talhão removido com sucesso!', 'OK');
            this.findTalhoes();
          });
        }
      });
    } else {
      this.dialogBox.show('Nenhum talhão selecionado!','ERROR');
    }
  }

  changeFilterService() {
    this.dataService.changeFilter(this.filterForm);
  }

  changeEntidade() {
    this.isAddEdit = false;
    this.dataService.changeFilter(null);
    this.propriedadeService.byEntidade(this.filterForm.value.entidade.entidade_id).subscribe((propriedades: Propriedade) => {
      this.propriedades = propriedades;
    });
  }

  changePropriedade() {
    this.findTalhoes();
  }

  cleanFilter() {
    this.filterForm.reset();
    this.rowsTalhao = null;
  }

  findTalhoes() {
    this.talhao = null;
    if (this.filterForm.valid) {
      this.dataService.changeTalhaoFilter(this.filterForm);
      this.loading = true;
      this.talhaoService.findTalhoesPropriedade(this.filterForm.value.propriedade.propriedade_id).subscribe(data => {
        this.loading = false;
        this.talhao = data;
        this.rowsTalhao = data;
      });
    }
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      // this.router.navigate(['/fonteemissora/adicionar/' + $event.row.id]);
    }
  }

}
