import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterTalhao } from '../models/filtertalhao';
import { Talhao } from '../models/Talhao';

@Injectable({
  providedIn: 'root'
})
export class TalhaoService {

  constructor(private http: HttpClient, private router: Router) { }
  // TIPO MONITORAMENTO

  getList(): Observable<any> {
    return this.http.get<Talhao>(`${environment.baseUrl}/auth/tipomonilist`);
  }

  findTalhoesPropriedade(id: number) {
    return this.http.get<any>(`${environment.baseUrl}/auth/propriedadetalhao/${id}`);
  }

  listar(): any {
    return this.http.get(`${environment.baseUrl}/auth/tipomonilista`);
  }

  getById(id: any): Observable<Talhao> {
    return this.http.get<Talhao>(`${environment.baseUrl}/auth/talhao/${id}`);
  }

  add(talhao: Talhao) {
    return this.http.post<any>(environment.baseUrl + '/auth/talhao', talhao);
  }

  remove(id: string) {
    return this.http.delete(environment.baseUrl + '/auth/talhao/' + id);
  }

  edit(recurso: Talhao) {
    return this.http.put(`${environment.baseUrl}/auth/talhao`, recurso);
  }
}
