import { Component, OnInit } from '@angular/core';
import { TecnicoService } from '../services/tecnico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.sass']
})
export class TecnicoComponent implements OnInit {

  rows: any;
  selected = [];

  columns =[
    {name : 'Nome', prop : 'nome', width : '35%', selecionado: true},
    {name : 'Data Criação', prop : 'dtCreated', width : '20%', selecionado: false}
  ];

  constructor(private tecnicoService: TecnicoService, private router: Router) {
  }

  ngOnInit() {
    this.lista();
  }

  lista() {
    this.tecnicoService.lista().subscribe(data => {
      this.rows = data;
    });
  }

}
