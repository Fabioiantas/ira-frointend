import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeeService } from 'src/app/services/gee.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { EntidadeService } from 'src/app/services/entidade.service';
import { Entidade } from 'src/app/models/entidade';

@Component({
  selector: 'app-fonte-entidade',
  templateUrl: './fonte-entidade.component.html',
  styleUrls: ['./fonte-entidade.component.sass']
})
export class FonteEntidadeComponent implements OnInit {
  fonteEntidade: any = [];
  entidades: any;
  entidade: any;
  selected: any = [];
  rowsFonteEntidade: any[];
  groups = [];
  params: any;
  nmReduzido: string;

  columnsFonteEntidade = [
    {name : 'Classificação', prop : 'nm_classificacao', width : '35%', selecionado: true},
    {name : 'Fonte', prop : 'nm_fonte_emissao', width : '35%', selecionado: true},
    {name : 'Combustível', prop : 'nm_combustivel', width : '35%', selecionado: true},
    {name : 'Total CO2 Fóssel', prop : 'qt_total_co2_fossel', width : '35%', selecionado: true},
    {name : 'Total CO2 Bio', prop : 'qt_total_co2_bio', width : '35%', selecionado: true},
    {name : '', prop : 'icons', width : '35%', selecionado: true}
  ];


  constructor(private router: Router,
              private route: ActivatedRoute,
              private geeService: GeeService,
              private dialogBox: DialogBoxService,
              private entidadeService: EntidadeService) { }



  ngOnInit() {
    this.populaEntidades();
    this.route.params.subscribe(data => {
      this.params = data;
      if (this.params.id) {
        this.populaTable(this.params.id);
      }
    });
  }

  populaEntidades() {
    this.entidadeService.listaEntidades().subscribe(entidades => {
      this.entidades = entidades;
    })
  }

  populaTable(id: any) {
    this.geeService.listaFonteEntidade(id).subscribe((response) => {
      this.fonteEntidade = [...response];
      this.rowsFonteEntidade = [...response];
      this.groups = [...response];
      if (this.rowsFonteEntidade.length) {
        this.nmReduzido = this.rowsFonteEntidade[0].nm_reduzido;
      } else {
        this.nmReduzido = null;
      }
    });
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/gee/adicionar/' + $event.row.id]);
    }
  }

  changeEntidade (){
    if (this.entidade)
      this.populaTable(this.entidade.entidade_id);
  }

  inserirEmissao(id: any) {
      this.router.navigate(['/gee/fontes-cadastro/' + id]);
  }

}
