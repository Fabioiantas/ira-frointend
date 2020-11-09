import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassificacaoRequisitoService } from 'src/app/services/auditoria/classificacao-requisito.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-classificacao-requisito',
  templateUrl: './classificacao-requisito.component.html',
  styleUrls: ['./classificacao-requisito.component.sass']
})
export class ClassificacaoRequisitoComponent implements OnInit {

  // --page2
  classificacaoRequisito: any = [];
  selected: any = [];
  rowsClassificacaoRequisito: any[];

  columnsClassificacaoRequisito = [
    {name : 'Nome', prop : 'nm_classificacao', width : '35%', selecionado: true},
    {name : 'Sigla', prop : 'sg_classificacao', width : '20%', selecionado: false},
    {name : 'Descricão', prop : 'ds_classificacao', width : '20%', selecionado: false}
  ];

  constructor(private router: Router,
              private classificacaoRequisitoService: ClassificacaoRequisitoService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.classificacaoRequisitoService.list().subscribe((response) => {
      this.classificacaoRequisito = [...response];
      this.rowsClassificacaoRequisito = [...response];
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show('Confirma remoção da Classificacao?', 'CONFIRM').then(sim => {
        if (sim) {
          this.classificacaoRequisitoService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Classificacao removida com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id: string) {
    this.router.navigate(['/classificacaorequisito/adicionar/' + id]);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/classificacaorequisito/adicionar/' + $event.row.id]);
    }
  }

}
