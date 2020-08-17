import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeeService } from 'src/app/services/gee.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-fonte-entidade',
  templateUrl: './fonte-entidade.component.html',
  styleUrls: ['./fonte-entidade.component.sass']
})
export class FonteEntidadeComponent implements OnInit {
  fonteEntidade: any = [];
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
              private dialogBox: DialogBoxService) { }



  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
      this.populaTable();
    });
  }

  populaTable() {
    this.geeService.listaFonteEntidade(this.params.id).subscribe((response) => {
      this.fonteEntidade = [...response];
      this.rowsFonteEntidade = [...response];
      this.groups = [...response];
      this.nmReduzido = response[0].nm_reduzido;
    });
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/gee/adicionar/' + $event.row.id]);
    }
  }

}
