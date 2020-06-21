import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogBoxService } from '../_services/dialog-box.service';
import { LicencaAmbientalService } from '../services/licenca-ambiental.service';

@Component({
  selector: 'app-licenca-ambiental',
  templateUrl: './licenca-ambiental.component.html',
  styleUrls: ['./licenca-ambiental.component.sass']
})
export class LicencaAmbientalComponent implements OnInit {
  licencaAmbiental: any = [];
  selected: any = [];
  rowsLicencaAmbiental: any[];

  columnsLicencaAmbiental = [
    {name : 'Entidade', prop : 'nm_entidade', width : '35%', selecionado: true},
    {name : 'N° L.A', prop : 'nr_licenca_ambiental', width : '35%', selecionado: true},
    {name : 'Atividade', prop : 'nm_atividade', width : '35%', selecionado: true},
    {name : 'Tipo', prop : 'nm_abreviado', width : '35%', selecionado: true},
    {name : 'Validade', prop : 'dt_validade', width : '35%', selecionado: true},
    {name : 'Orgão', prop : 'nm_orgao', width : '35%', selecionado: true},
    {name : 'Situação', prop : 'ds_situacao', width : '35%', selecionado: true}
    /*{name : 'CNPJ', prop : 'nr_protocolo', width : '35%', selecionado: true},
    {name : 'CPF', prop : 'nr_protocolo_novo', width : '35%', selecionado: true},
    {name : 'Endereço', prop : 'id_licenca_pai', width : '35%', selecionado: true},
    {name : 'E-mail', prop : 'dt_emissao', width : '35%', selecionado: true},*/
    /*{name : 'Telefone', prop : 'dt_emissao_protocolo', width : '35%', selecionado: true},
    {name : 'Telefone', prop : 'dt_protocolacao', width : '35%', selecionado: true},
    {name : 'Telefone', prop : 'dt_validade_protocolo', width : '35%', selecionado: true},
    {name : 'Telefone', prop : 'nr_dias_limite_protocolo', width : '35%', selecionado: true},
    {name : 'Telefone', prop : 'id_entidade', width : '35%', selecionado: true},
    {name : 'Telefone', prop : 'id_orgao', width : '35%', selecionado: true},
    {name : 'Telefone', prop : 'id_tipo_licenca', width : '35%', selecionado: true},
    {name : 'Telefone', prop : 'id_tipo_atividade', width : '35%', selecionado: true},
    {name : 'Telefone', prop : 'ds_email_alerta', width : '35%', selecionado: true}*/
  ];
  constructor(private router: Router,
              private licencaAmbientalService: LicencaAmbientalService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.licencaAmbientalService.getAll().subscribe((response) => {
      this.licencaAmbiental = [...response];
      this.rowsLicencaAmbiental = [...response];
      console.log(this.rowsLicencaAmbiental[0].dt_validade);
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show("Confirma remoção da Licença Ambiental?","CONFIRM").then(sim=>{
        if(sim){
          this.licencaAmbientalService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Licença removida com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id) {
    this.router.navigate(['/licencaambiental/adicionar/' + id])
  }

  editarForm(e){
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/licencaambiental/adicionar/' + $event.row.id]);
    }
  }

}
