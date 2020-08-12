import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Gee } from '../models/gee';

@Injectable({
  providedIn: 'root'
})
export class GeeService {

  constructor(private http: HttpClient, private router: Router) { }

  listar(): any {
    return this.http.get(environment.baseUrl + '/auth/gees');
  }

  listaGee(): any {
    return this.http.get(`${environment.baseUrl}/auth/geeslist`);
  }

  add(gee: Gee) {

    return this.http.post<any>(environment.baseUrl + '/auth/gee', gee);
  }

  remove(id) {
    return this.http.delete(environment.baseUrl + '/auth/gee/' + id);
  }


  edit(entidade: Gee) {
    return this.http.put(environment.baseUrl + '/auth/gee', entidade);
  }

  getById(id: any) {
    return this.http.get<Gee>(environment.baseUrl + '/auth/gee/' + id);
  }
}
