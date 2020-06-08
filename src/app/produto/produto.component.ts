import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.sass']
})
export class ProdutoComponent implements OnInit {

  rows: any;
  selected = [];

  columns =[
    {name : 'Nome', prop : 'nome', width : '35%', selecionado: true},
    {name : 'Data Criação', prop : 'dtCreated', width : '20%', selecionado: false}
  ];

  constructor(private produtoService: ProdutoService, private router: Router) {
  }

  ngOnInit() {
    this.lista();
  }

  lista() {
    this.produtoService.lista().subscribe(data => {
      this.rows = data;
    });
  }


}
