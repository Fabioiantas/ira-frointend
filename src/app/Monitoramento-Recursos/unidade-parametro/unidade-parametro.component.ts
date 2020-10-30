import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterUnidadeParametro } from 'src/app/models/filterUnidadeParametro';
import { Parametro } from 'src/app/models/parametro';
import { UnidadeParametro } from 'src/app/models/unidadeParametro';
import { DataService } from 'src/app/services/data.service';
import { ParametroService } from 'src/app/services/parametro.service';
import { UnidadeParametroService } from 'src/app/services/unidade-parametro.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-unidade-parametro',
  templateUrl: './unidade-parametro.component.html',
  styleUrls: ['./unidade-parametro.component.sass']
})
export class UnidadeParametroComponent implements OnInit {

  heading = 'Recursos Monitorados';
  subheading = 'Adicionar novo Monitoramento';
  icon = 'lnr lnr-earth';
  toggleMobileSidebar: any;

  unidadeparametro: UnidadeParametro;
  parametros: Parametro;
  rowsUnidadeParametro: any;
  model: any;
  searching = false;
  searchFailed = false;
  // filterUnidadeParametro: FilterUnidadeParametro = new FilterUnidadeParametro();
  filterForm: FormGroup;
  selected: any = [];
  produtoSelecionado = null;
  loading = false;
  loadingC = false;
  params: any;
  isAddEdit = false;

  columnsUnidadeParametro = [
    {name : 'Unidade Padrão', prop : 'cd_unidade_padrao', width : '35%', selecionado: true},
    {name : 'Descricão', prop : 'ds_unidade_padrao', width : '20%', selecionado: false}
  ];

  constructor(private dialogBox: DialogBoxService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private unidadeParametroService: UnidadeParametroService,
              private parametroService: ParametroService,
              private dataService: DataService) { }

  ngOnInit() {

    this.parametroService.list().subscribe(parametros => {
      this.parametros = parametros;
    });

    this.filterForm = this.formBuilder.group({
      parametro: [null, Validators.required]
    });
  }

  changeParametro() {
    if (this.filterForm.valid) {
      this.dataService.changeParametro(this.filterForm.value);
      this.findUnidadeParametro();
    }
  }

  findUnidadeParametro() {
    if (this.filterForm.valid) {
      this.unidadeParametroService.getListUnidadeByParametroId(this.filterForm.value.parametro.parametro_id).subscribe(data => {
        this.rowsUnidadeParametro = data.unidades;
      });
    }
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/unidade/adicionar/' + $event.row.id]);
    }
  }

  cleanFilter() {
    this.filterForm.reset();
    this.rowsUnidadeParametro = null;
    this.dataService.changeParametro(null);
  }

  inserir() {
    this.router.navigate(['unidade/adicionar']);
  }

  editar(row: any) {
    if(!row) {
      this.dialogBox.show('Nehuma unidade selecionada!', 'ERROR');
      return;
    }
    this.router.navigate(['/unidade/adicionar/' + row.id]);
  }

  remover() {
    if (this.selected[0]) {
      this.dialogBox.show("Confirma remoção da Unidade?","CONFIRM").then(sim => {
        if(sim){
          this.unidadeParametroService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Unidade removida com sucesso!', 'OK');
            this.findUnidadeParametro();
          });
        }
      });
    } else {
      this.dialogBox.show('Nenhuma Unidade selecionada!','ERROR');
    }
  }

  /*addTalhao(){
    this.dataService.changeTalhaoFilter(this.filterForm.value);
    this.router.navigate(['/unidadeparametro/adicionar']);
  }

  editar(row: any) {
    if(!row) {
      this.dialogBox.show('Nehum talhão selecionado!', 'ERROR');
      return;
    }
    this.router.navigate(['/unidadeparametro/adicionar/' + row.id]);
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show("Confirma remoção do Talhão?","CONFIRM").then(sim=>{
        if(sim){
          this.unidadeparametroService.remove(this.selected[0].id).subscribe(data => {
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
    this.unidadeparametro = null;
    if (this.filterForm.valid) {
      this.dataService.changeTalhaoFilter(this.filterForm);
      this.loading = true;
      this.unidadeparametroService.findTalhoesPropriedade(this.filterForm.value.propriedade.propriedade_id).subscribe(data => {
        this.loading = false;
        this.unidadeparametro = data;
        this.rowsTalhao = data;
      });
    }
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      // this.router.navigate(['/fonteemissora/adicionar/' + $event.row.id]);
    }
  }*/

}
