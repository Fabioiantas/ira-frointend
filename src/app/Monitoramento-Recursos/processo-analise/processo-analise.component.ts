import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ProcessoAnaliseService } from 'src/app/services/processo-analise.service';

@Component({
  selector: 'app-processo-analise',
  templateUrl: './processo-analise.component.html',
  styleUrls: ['./processo-analise.component.sass']
})
export class ProcessoAnaliseComponent implements OnInit {

  processo: any = [];
  selected: any = [];
  rowsProcesso: any[];

  columnsProcesso = [
    {name : 'Processo', prop : 'nm_processo', width : '35%', selecionado: true},
    {name : 'Descrição', prop : 'ds_processo', width : '20%', selecionado: false}
  ];

  constructor(private router: Router,
              private processoService: ProcessoAnaliseService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.processoService.listar().subscribe((response) => {
      this.processo = [...response];
      this.rowsProcesso = [...response];
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show('Confirma remoção do Processo?', 'CONFIRM').then(sim => {
        if (sim) {
          this.processoService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Processo removido com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id) {
    console.log('editar processo: ' + id);
    this.router.navigate(['/processo/adicionar/' + id]);
  }

  editarForm() {
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/processo/adicionar/' + $event.row.id]);
    }
  }

}
