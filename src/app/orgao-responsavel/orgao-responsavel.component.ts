import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrgaoService } from '../services/orgao.service';
import { DialogBoxService } from '../_services/dialog-box.service';

declare var $: any;

@Component({
  selector: 'app-orgao-responsavel',
  templateUrl: './orgao-responsavel.component.html',
  styleUrls: ['./orgao-responsavel.component.sass']
})
export class OrgaoResponsavelComponent implements OnInit {
  orgao: any = [];
  selected: any = [];
  rowsOrgao: any[];

  columnsOrgao = [
    {name : 'Orgão Responsável', prop : 'nm_orgao', width : '35%', selecionado: true},
    {name : 'Sigla', prop : 'sg_orgao', width : '10%', selecionado: false},
    {name : 'Esfera', prop : 'nm_esfera', width : '20%', selecionado: false},
    {name : 'Estado', prop : 'sg_estado', width : '20%', selecionado: false}
  ];
  constructor(private router: Router,
              private orgaoService: OrgaoService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.orgaoService.listar().subscribe((response) => {
      this.orgao = [...response];
      this.rowsOrgao = [...response];
    });
  }

  remover() {
    console.log('id: ' + this.selected[0].id);
    if (this.selected) {
      this.dialogBox.show("Confirma remoção do Orgão?","CONFIRM").then(sim=>{
        if(sim){
          this.orgaoService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Orgão removido com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id) {
    console.log('editar orgao: ' + id);
    this.router.navigate(['/orgao/adicionar/' + id])
  }

  editarForm(e){
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/orgao/adicionar/' + $event.row.id]);
    }
  }

}
