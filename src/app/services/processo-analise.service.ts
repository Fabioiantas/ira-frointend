import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProcessoAnalise } from '../models/processoAnalise';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessoAnaliseService {

  constructor(private http: HttpClient, private router: Router) { }

  listar(): any {
    return this.http.get(environment.baseUrl + '/auth/processos');
  }

  list(): any {
    return this.http.get(environment.baseUrl + '/auth/processolist');
  }

  add(processo: ProcessoAnalise) {

    return this.http.post<any>(environment.baseUrl + '/auth/processo', processo);
  }

  remove(id) {
    return this.http.delete(environment.baseUrl + '/auth/processo/' + id);
  }


  edit(processo: ProcessoAnalise) {
    return this.http.put(environment.baseUrl + '/auth/processo', processo);
  }

  getById(id: any) {
    return this.http.get<ProcessoAnalise>(environment.baseUrl + '/auth/processo/' + id);
  }
}

