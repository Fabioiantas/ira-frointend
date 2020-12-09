import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { GeeService } from 'src/app/services/gee.service';

@Component({
  selector: 'app-gee',
  templateUrl: './gee.component.html',
  styleUrls: ['./gee.component.sass']
})
export class GeeComponent implements OnInit {

  gee: any = [];
  selected: any = [];
  rowsGee: any[];
  groups = [];
  columnsGee = [
    {name : 'Entidade', prop : 'nm_reduzido', width : '35%', selecionado: true},
    {name : 'CNPJ', prop : 'nr_cnpj', width : '35%', selecionado: true},
    {name : 'CO2 Fóssel', prop : 'qt_co2_fossel', width : '35%', selecionado: true},
    {name : 'CO2 Bio', prop : 'qt_co2_bio', width : '35%', selecionado: true}
  ];


  constructor(private router: Router,
              private geeService: GeeService,
              private dialogBox: DialogBoxService) { }




  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.geeService.listar().subscribe((response) => {
      this.gee = [...response];
      this.rowsGee = [...response];
      this.groups = [...response];
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show('Confirma remoção da gee?', 'CONFIRM').then((sim: any) => {
        if (sim) {
          this.geeService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('gee removida com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id: string) {
    this.router.navigate(['/gee/adicionar/' + id]);
  }

  editarForm() {
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.fontes($event.row.id);
      //this.router.navigate(['/gee/adicionar/' + $event.row.id]);
    }
  }

  add() {
    alert('teste');
  }

  fontes(id: string) {
    this.router.navigate(['/gee/fontes/' + id]);
  }

}
