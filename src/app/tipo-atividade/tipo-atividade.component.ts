import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogBoxService } from '../_services/dialog-box.service';
import { TipoAtividadeService } from '../services/tipo-atividade.service';

declare var $: any;


@Component({
  selector: 'app-tipo-atividade',
  templateUrl: './tipo-atividade.component.html',
  styleUrls: ['./tipo-atividade.component.sass']
})
export class TipoAtividadeComponent implements OnInit {
  
  tipoAtividade: any = [];
  selected: any = [];
  rowsTipoAtividade: any[];

  columnsTipoAtividade = [
    {name : 'Tipo Atividade', prop : 'nm_atividade', width : '35%', selecionado: true}
  ];
  constructor(private router: Router,
              private tipoAtividadeService: TipoAtividadeService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.tipoAtividadeService.listar().subscribe((response) => {
      this.tipoAtividade = [...response];
      this.rowsTipoAtividade = [...response];
    });
  }

  remover() {
    console.log('id: ' + this.selected[0].id);
    if (this.selected) {
      this.dialogBox.show("Confirma remoção do Tipo Atividade?","CONFIRM").then(sim=>{
        if(sim){
          this.tipoAtividadeService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Tipo Atividade removida com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id) {
    console.log('editar tipoAtividade: ' + id);
    this.router.navigate(['/tipoatividade/adicionar/' + id])
  }

  editarForm(e){
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/tipoatividade/adicionar/' + $event.row.id]);
    }
  }

}
