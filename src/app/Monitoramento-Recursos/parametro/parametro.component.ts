import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParametroService } from 'src/app/services/parametro.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

declare var $: any;

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.sass']
})
export class ParametroComponent implements OnInit {

  parametro: any = [];
  selected: any = [];
  rowsParametro: any[];

  columnsParametro = [
    {name : 'Parâmetro', prop : 'nm_parametro', width : '35%', selecionado: true},
    {name : 'Descrição', prop : 'ds_parametro', width : '20%', selecionado: false}
  ];

  constructor(private router: Router,
              private parametroService: ParametroService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.parametroService.listar().subscribe((response) => {
      this.parametro = [...response];
      this.rowsParametro = [...response];
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show("Confirma remoção do Parâmetro?","CONFIRM").then(sim=>{
        if(sim){
          this.parametroService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Parâmetro removido com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id) {
    console.log('editar parametro: ' + id);
    this.router.navigate(['/parametro/adicionar/' + id])
  }

  editarForm(e){
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/parametro/adicionar/' + $event.row.id]);
    }
  }

}
