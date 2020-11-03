import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoMonitoramentoService } from 'src/app/services/tipo-monitoramento.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-tipo-monitoramento',
  templateUrl: './tipo-monitoramento.component.html',
  styleUrls: ['./tipo-monitoramento.component.sass']
})
export class TipoMonitoramentoComponent implements OnInit {

  tipoMonitoramento: any = [];
  selected: any = [];
  rowsTipoMonitoramento: any[];

  columnsTipoMonitoramento = [
    {name : 'Númer', prop : 'nr_monitoramento', width : '35%', selecionado: true},
    {name : 'Recurso', prop : 'nm_recurso', width : '20%', selecionado: false},
    {name : 'Monitoramento', prop : 'nm_monitoramento', width : '20%', selecionado: false},
    {name : 'Situacao', prop : 'ie_situacao', width : '20%', selecionado: false}
  ];

  constructor(private router: Router,
              private tipoMonitoramentoService: TipoMonitoramentoService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.tipoMonitoramentoService.listar().subscribe((response) => {
      this.tipoMonitoramento = [...response];
      this.rowsTipoMonitoramento = [...response];
    });
  }

  remover(selected: any) {
    if (!selected) {
      this.dialogBox.show('Selecione um Monitoramento!', 'ERROR');
      return;
    }
    this.dialogBox.show('Confirma remoção do Monitoramento?', 'CONFIRM').then(sim => {
      if (sim) {
        this.tipoMonitoramentoService.remove(selected[0].id).subscribe(data => {
          this.dialogBox.show('Monitoramento removido com sucesso!', 'OK');
          this.populaTable();
        });
      }
    });
  }

  editar(selected: any) {
    if (!selected) {
      this.dialogBox.show('Selecione um Monitoramento!', 'ERROR');
      return;
    }
    this.router.navigate(['/tipomonitoramento/adicionar/' + selected.id]);
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
