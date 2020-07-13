import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from '../_models/usuario';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private router: Router) {}

  lista(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(environment.baseUrl + '/users');
  }

  add(usuario: Usuario) {
    return this.http.post(environment.baseUrl + '/register', usuario);
  }

  remove(usuario: Usuario) {
    return this.http.post(environment.baseUrl + '/users/remove', usuario);
  }

  edit(usuario: Usuario) {
    return this.http.put(environment.baseUrl + '/user/', usuario);
  }

  getById(id: any) {
    return this.http.get<Usuario>(environment.baseUrl + '/user/' + id);
  }

}
