import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditoriaNivelService } from 'src/app/services/auditoria-nivel.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-auditoria-nivel',
  templateUrl: './auditoria-nivel.component.html',
  styleUrls: ['./auditoria-nivel.component.sass']
})
export class AuditoriaNivelComponent implements OnInit {
  //--page
  nivel: any = [];
  selected: any = [];
  rowsNivel: any[];

  columnsNivel = [
    {name : 'Atividade', prop : 'nm_atividade', width : '35%', selecionado: true},
    {name : 'Auditoria', prop : 'nm_nivel', width : '20%', selecionado: false},
    {name : 'Situação', prop : 'ie_situacao', width : '20%', selecionado: false}
  ];

  constructor(private router: Router,
              private auditoriaNivelService: AuditoriaNivelService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.auditoriaNivelService.list().subscribe((response) => {
      this.nivel = [...response];
      this.rowsNivel = [...response].map(row => ({
        id: row.id,
        tipo_atividade_id: row.tipo_atividade_id,
        nm_atividade: row.tipo_atividade.nm_atividade,
        nm_nivel: row.nm_nivel,
        ds_nivel: row.ds_nivel,
        ie_situacao: row.ie_situacao,
      }));
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show('Confirma remoção do Nível?', 'CONFIRM').then(sim => {
        if (sim) {
          this.auditoriaNivelService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Nível removido com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id) {
    console.log('editar nivel: ' + id);
    this.router.navigate(['/auditorianivel/adicionar/' + id]);
  }

  editarForm(e) {
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/auditorianivel/adicionar/' + $event.row.id]);
    }
  }

}
