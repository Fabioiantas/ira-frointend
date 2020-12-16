import { Arquivo } from './../models/arquivo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EscopoGee } from '../models/escopoGee';

@Injectable({
  providedIn: 'root'
})
export class EscopoGeeService {

  constructor(private http: HttpClient, private router: Router) { }

  getList(): any {
    return this.http.get(environment.baseUrl + '/auth/escopos');
  }

  list(): any {
    return this.http.get(environment.baseUrl + '/auth/escoposl');
  }

  remove(id: string) {
    return this.http.delete(environment.baseUrl + '/auth/escopo/' + id);
  }

  add(escopo: EscopoGee, arquivo: any) {
    return this.http.post<any>(`${environment.baseUrl}/auth/escopo`, [escopo, arquivo]);
  }

  saveFile(arquivo: Arquivo) {
    return this.http.post<any>(`${environment.baseUrl}/auth/arquivo`, arquivo);
  }


  edit(escopo: EscopoGee) {
    return this.http.put(`${environment.baseUrl}/auth/escopo`, escopo);
  }

  getById(id: any) {
    return this.http.get<EscopoGee>(environment.baseUrl + '/auth/escopo/' + id);
  }
}
