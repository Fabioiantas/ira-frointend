import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { EscopoGeeService } from 'src/app/services/escopo-gee.service';

@Component({
  selector: 'app-escopo',
  templateUrl: './escopo.component.html',
  styleUrls: ['./escopo.component.sass']
})
export class EscopoComponent implements OnInit {
  escopo: any = [];
  selected: any = [];
  rowsEscopo: any[];

  columnsEscopo = [
    {name : 'Escopo', prop : 'nm_escopo', width : '35%', selecionado: true},
    {name : 'Descrição', prop : 'ds_escopo', width : '20%', selecionado: false}
  ];
  constructor(private router: Router,
              private dialogBox: DialogBoxService,
              private escopoService: EscopoGeeService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.escopoService.list().subscribe((response) => {
      this.escopo = [...response];
      this.rowsEscopo = [...response];
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show('Confirma remoção do Escopo?', 'CONFIRM').then(sim => {
        if (sim) {
          this.escopoService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Escopo removido com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id) {
    console.log('editar: ' + id);
    this.router.navigate([`/escopo/adicionar/${id}`]);
  }

  editarForm(e) {
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/escopo/adicionar/' + $event.row.id]);
    }
  }

}
