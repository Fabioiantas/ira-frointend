import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampanhaService } from '../services/campanha.service';
import { DialogBoxService } from '../_services/dialog-box.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-campanhas',
  templateUrl: './campanhas.component.html',
  styleUrls: ['./campanhas.component.sass']
})
export class CampanhasComponent implements OnInit {

  rows: any;
  selected = [];
  storage: any = localStorage;

  columns = [
    {name : 'Nome', prop : 'nome', width : '35%', selecionado: true},
    {name : 'Data Criação', prop : 'dtCreated', width : '20%', selecionado: false}
  ];

  constructor(private dialogBox: DialogBoxService, private campanhaService: CampanhaService, private router: Router) {
  }

  ngOnInit() {
    this.lista();
  }

  editar() {
    if (this.selected) {
      this.router.navigate(['/campanha/editar/' + this.selected[0].idCampanha]);
    }
  }

  lista() {
    this.campanhaService.lista().subscribe(data => {
      this.rows = data;
    });
  }

  remover() {
    if (this.selected) {
      this.campanhaService.remove(this.selected[0]).subscribe(data => {
        this.dialogBox.show('Campanha salva com sucesso!', 'OK');
        this.lista();
      });
    }
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/campanha/editar/' + $event.row.idCampanha]);
    }
  }
}

