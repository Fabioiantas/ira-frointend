import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { CombustivelService } from 'src/app/services/combustivel.service';

@Component({
  selector: 'app-combustivel',
  templateUrl: './combustivel.component.html',
  styleUrls: ['./combustivel.component.sass']
})
export class CombustivelComponent implements OnInit {

  combustiveis: any = [];
  selected: any = [];
  rowsCombustivel: any[];

  columnsCombustivel = [
    {name : 'Fonte', prop : 'nm_combustivel', width : '35%', selecionado: true},
    {name : 'Class.', prop : 'cd_unidade_padrao', width : '20%', selecionado: false},
    {name : 'UN.', prop : 'nr_fator_co2_bio', width : '20%', selecionado: false},
    {name : 'co2', prop : 'nr_fator_n2o_bio', width : '20%', selecionado: false},
    {name : 'n2o', prop : 'nr_fator_ch4_bio', width : '20%', selecionado: false},
    {name : 'UN.', prop : 'nr_fator_co2_fossel', width : '20%', selecionado: false},
    {name : 'co2', prop : 'nr_fator_n2o_fossel', width : '20%', selecionado: false},
    {name : 'n2o', prop : 'nr_fator_ch4_fossel', width : '20%', selecionado: false},
    {name : 'ch4', prop : 'nr_fator_co2_movel', width : '20%', selecionado: false},
    {name : 'Fóseel', prop : 'nr_fator_n2o_movel', width : '20%', selecionado: false},
    {name : 'Bio', prop : 'nr_fator_ch4_movel', width : '20%', selecionado: false},
    {name : 'Bio M.', prop : 'nr_fator_movel_fossel', width : '20%', selecionado: false},
    {name : 'Bio M.', prop : 'nr_fator_movel_bio', width : '20%', selecionado: false},
    {name : 'Bio M.', prop : 'tipo_combustivel_mistura_id', width : '20%', selecionado: false}
  ];


  constructor(private router: Router,
              private dialogBox: DialogBoxService,
              private combustivelService: CombustivelService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.combustivelService.list().subscribe((response) => {
      this.combustiveis = [...response];
      this.rowsCombustivel = [...response];
      console.log(JSON.stringify(response));
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show('Confirma remoção do Combustivel?', 'CONFIRM').then(sim => {
        if (sim) {
          this.combustivelService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Combustivel removido com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id) {
    console.log('editar: ' + id);
    this.router.navigate(['/combustivel/adicionar/' + id]);
  }

  editarForm(e) {
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/combustivel/adicionar/' + $event.row.id]);
    }
  }

}
