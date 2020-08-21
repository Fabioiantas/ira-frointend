import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogBoxService } from '../_services/dialog-box.service';
import { EntidadeService } from '../services/entidade.service';

declare var $: any;

@Component({
  selector: 'app-entidade',
  templateUrl: './entidade.component.html',
  styleUrls: ['./entidade.component.sass']
})
export class EntidadeComponent implements OnInit {

  entidade: any = [];
  selected: any = [];
  rowsEntidade: any[];

  columnsEntidade = [
    {name : 'Entidade', prop : 'nm_entidade', width : '35%', selecionado: true},
    {name : 'CNPJ', prop : 'nr_cnpj', width : '35%', selecionado: true},
    {name : 'CPF', prop : 'nr_cpf', width : '35%', selecionado: true},
    {name : 'Endereço', prop : 'ds_endereco', width : '35%', selecionado: true},
    {name : 'E-mail', prop : 'email', width : '35%', selecionado: true},
    {name : 'Telefone', prop : 'nr_telefone', width : '35%', selecionado: true}
  ];
  constructor(private router: Router,
              private entidadeService: EntidadeService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.entidadeService.listar().subscribe((response) => {
      this.entidade = [...response];
      this.rowsEntidade = [...response];
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show('Confirma remoção da Entidade?', 'CONFIRM').then(sim => {
        if (sim) {
          this.entidadeService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Entidade removida com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id) {
    this.router.navigate(['/entidade/adicionar/' + id]);
  }

  editarForm(e) {
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/entidade/adicionar/' + $event.row.id]);
    }
  }

}
