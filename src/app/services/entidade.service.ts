import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Entidade } from '../models/entidade';

@Injectable({
  providedIn: 'root'
})
export class EntidadeService {

  constructor(private http: HttpClient, private router: Router) { }

  listar(): any {
    return this.http.get(environment.baseUrl + '/auth/entidades');
  }

  listaEntidades(): any {
    return this.http.get(environment.baseUrl + '/auth/entidadeslist');
  }

  listaEntidadesLa(): any {
    return this.http.get(environment.baseUrl + '/auth/entidadeslistla');
  }

  add(entidade: Entidade) {

    return this.http.post<any>(environment.baseUrl + '/auth/entidade', entidade);
  }

  remove(id) {
    return this.http.delete(environment.baseUrl + '/auth/entidade/' + id);
  }


  edit(entidade: Entidade) {
    return this.http.put(environment.baseUrl + '/auth/entidade', entidade);
  }

  getById(id: any) {
    return this.http.get<Entidade>(environment.baseUrl + '/auth/entidade/' + id);
  }
}
