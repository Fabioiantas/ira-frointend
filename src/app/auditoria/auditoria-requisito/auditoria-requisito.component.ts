import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditoriaItem } from 'src/app/models/auditoriaItem';
import { AuditoriaItemService } from 'src/app/services/auditoria/auditoria-item.service';
import { AuditoriaRequisitoService } from 'src/app/services/auditoria/auditoria-requisito.service';
import { ClassificacaoRequisitoService } from 'src/app/services/auditoria/classificacao-requisito.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-auditoria-requisito',
  templateUrl: './auditoria-requisito.component.html',
  styleUrls: ['./auditoria-requisito.component.sass']
})
export class AuditoriaRequisitoComponent implements OnInit {

  // --page2
  auditoriaRequisito: any = [];
  selected: any = [];
  rowsAuditoriaRequisito: any[];
  auditoriaItem = new AuditoriaItem() ;
  listAuditoriaItem: any;

  columnsAuditoriaRequisito = [
    {name : 'Código', prop : 'id', width : '20%', selecionado: true},
    {name : 'Requisito', prop : 'ds_requisito', width : '80%', selecionado: false}
  ];

  constructor(private router: Router,
              private auditoriaRequisitoService: AuditoriaRequisitoService,
              private auditoriaItemService: AuditoriaItemService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.getItens();
  }

  getItens() {
    this.auditoriaItemService.list().subscribe(data => {
      this.listAuditoriaItem = data;
    });
  }

  populaTable(Itemid: any) {
    this.auditoriaRequisitoService.getByItemId(Itemid).subscribe((response) => {
      this.auditoriaRequisito = [...response];
      this.rowsAuditoriaRequisito = [...response];
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show('Confirma remoção da Requisito?', 'CONFIRM').then(sim => {
        if (sim) {
          this.auditoriaRequisitoService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Requisito removido com sucesso!', 'OK');
            this.populaTable(this.auditoriaItem.id);
          });
        }
      });
    }
  }

  editar(id: string) {
    this.router.navigate(['/auditoriarequisito/adicionar/' + id]);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/auditoriarequisito/adicionar/' + $event.row.id]);
    }
  }

  changeItem() {
    this.populaTable(this.auditoriaItem.id);
  }

}
