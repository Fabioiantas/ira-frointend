import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UnidadeParametro } from '../models/unidadeParametro';

@Injectable({
  providedIn: 'root'
})
export class UnidadeParametroService {

  constructor(private http: HttpClient, private router: Router) { }

  getListUnidadeByParametroId(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/unidadeparametros/${id}`);
  }

  // list(): any {
  //   return this.http.get(environment.baseUrl + '/auth/escoposl');
  // }

  // remove(id: string) {
  //   return this.http.delete(environment.baseUrl + '/auth/escopo/' + id);
  // }

  // add(escopo: EscopoGee) {
  //   return this.http.post<any>(`${environment.baseUrl}/auth/escopo`, escopo);
  // }


  // edit(escopo: EscopoGee) {
  //   return this.http.put(`${environment.baseUrl}/auth/escopo`, escopo);
  // }

  // getById(id: any) {
  //   return this.http.get<EscopoGee>(environment.baseUrl + '/auth/escopo/' + id);
  // }
}
