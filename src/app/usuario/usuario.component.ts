import { Component, OnInit } from '@angular/core';import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  rows: any;
  selected = [];

  columns =[
    {name : 'Nome', prop : 'name', width : '35%', selecionado: true},
    {name : 'E-mail', prop : 'email', width : '20%', selecionado: false}
  ];

  constructor(private usuarioService: UsuarioService, private router: Router) {
  }

  ngOnInit() {
    this.lista();
  }

  onDblclick(e) {
    this.editar(this.selected[0].idUsuario);
  }

  editar(id) {
    this.router.navigate(['/usuario/editar/' + id]);
  }

  lista() {
    this.usuarioService.lista().subscribe(data => {
      this.rows = data;
    });
  }

}
