import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoLicencaService } from '../services/tipo-licenca.service';
import { DialogBoxService } from '../_services/dialog-box.service';

declare var $: any;

@Component({
  selector: 'app-tipo-licenca',
  templateUrl: './tipo-licenca.component.html',
  styleUrls: ['./tipo-licenca.component.sass']
})

export class TipoLicencaComponent implements OnInit {
  
  tipoLicenca: any = [];
  selected: any = [];
  rowsTipoLicenca: any[];

  columnsTipoLicenca = [
    {name : 'Tipo Licença', prop : 'nm_licenca', width : '35%', selecionado: true},
    {name : 'Nome Abreviado', prop : 'nm_abreviado', width : '35%', selecionado: true},
    {name : 'Informações', prop : 'ds_informacao_licenca', width : '35%', selecionado: true}
  ];
  constructor(private router: Router,
              private tipoLicencaService: TipoLicencaService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.tipoLicencaService.listar().subscribe((response) => {
      this.tipoLicenca = [...response];
      this.rowsTipoLicenca = [...response];
    });
  }

  remover() {
    console.log('id: ' + this.selected[0].id);
    if (this.selected) {
      this.dialogBox.show("Confirma remoção do Tipo Licença?","CONFIRM").then(sim=>{
        if(sim){
          this.tipoLicencaService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Tipo Licença removida com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id) {
    this.router.navigate(['/tipolicenca/adicionar/' + id])
  }

  editarForm(e){
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/tipolicenca/adicionar/' + $event.row.id]);
    }
  }

}
