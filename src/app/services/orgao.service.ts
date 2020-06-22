import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Orgao } from '../models/orgao';

@Injectable({
  providedIn: 'root'
})

export class OrgaoService {

  constructor(private http: HttpClient, private router: Router) { }

  listar(): any {
    return this.http.get(environment.baseUrl + '/auth/orgaos');
  }

  listaOrgao(): any {
    return this.http.get(environment.baseUrl + '/auth/orgaolista');
  }

  Orgaolista(): any {
    return this.http.get(environment.baseUrl + '/auth/orgaolista');
  }
  
  add(orgao: Orgao) {
  
    return this.http.post<any>(environment.baseUrl + '/auth/orgao', orgao);
  }
  
  remove(id) {
    return this.http.delete(environment.baseUrl + '/auth/orgao/' + id);
  }
  
  
  edit(orgao: Orgao) {
    return this.http.put(environment.baseUrl + '/auth/orgao', orgao);
  }
  
  getById(id: any) {
    return this.http.get<Orgao>(environment.baseUrl + '/auth/orgao/' + id);
  }
}
