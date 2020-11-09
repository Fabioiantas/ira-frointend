import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditoriaItemService } from 'src/app/services/auditoria/auditoria-item.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-auditoria-item',
  templateUrl: './auditoria-item.component.html',
  styleUrls: ['./auditoria-item.component.sass']
})
export class AuditoriaItemComponent implements OnInit {

  // --page2
  auditoriaItem: any = [];
  selected: any = [];
  rowsItem: any[];

  columnsItem = [
    {name : 'Item', prop : 'ds_item', width : '35%', selecionado: true},
    {name : 'Situacao', prop : 'ie_situacao', width : '20%', selecionado: false}
  ];

  constructor(private router: Router,
              private auditoriaItemService: AuditoriaItemService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.auditoriaItemService.list().subscribe((response) => {
      this.auditoriaItem = [...response];
      this.rowsItem = [...response];
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show('Confirma remoção do Item?', 'CONFIRM').then(sim => {
        if (sim) {
          this.auditoriaItemService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Item removido com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id: string) {
    this.router.navigate(['/auditoriaitem/adicionar/' + id]);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/auditoriaitem/adicionar/' + $event.row.id]);
    }
  }

}
