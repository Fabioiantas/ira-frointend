import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogBoxService } from '../_services/dialog-box.service';
import { RecursoServiceService } from 'src/app/services/recurso-service.service';

declare var $: any;

@Component({
  selector: 'app-recurso',
  templateUrl: './Recurso.component.html',
  styleUrls: ['./Recurso.component.css']
})
export class RecursoComponent implements OnInit {

  recursos: any = [];
  selected: any = [];
  rowsRecurso: any[];

  columnsRecurso = [
    {name : 'Recurso', prop : 'nm_recurso', width : '35%', selecionado: true},
    {name : 'Descrição', prop : 'ds_recurso', width : '20%', selecionado: false}
  ];

  constructor(private router: Router,
              private recursoService: RecursoServiceService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.recursoService.listar().subscribe((response) => {
      this.recursos = [...response];
      this.rowsRecurso = [...response];
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show('Confirma remoção do Recurso?', 'CONFIRM').then(sim => {
        if(sim) {
          this.recursoService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Recurso removido com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id) {
    console.log('editar: ' + id);
    this.router.navigate(['/recurso/adicionar/' + id])
  }

  editarForm(e) {
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/recurso/adicionar/' + $event.row.id]);
    }
  }

}
