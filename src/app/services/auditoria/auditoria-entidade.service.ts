import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuditoriaEntidade } from 'src/app/models/auditoriaEntidade';
import { FilterAuditoriaEntidade } from 'src/app/models/filterAuditoriaEntidade';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaEntidadeService {

  // --service
  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/auditoriaentidade`);
  }

  getById(id: any) {
    return this.http.get<AuditoriaEntidade>(environment.baseUrl + '/auth/auditoriaentidade/' + id);
  }

  getByEntidadePropriedade(propriedadeId: any) {
    return this.http.get<any>(`${environment.baseUrl}/auth/auditoriaentidadebypropriedade/${propriedadeId}`);
  }

  getEntidadesAuditadas(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/entidadesauditadas`);
  }

  getAuditoriaEntidadeItReqById(auditoriaEntidadeId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/auditoriaentidadeitreqs/${auditoriaEntidadeId}`);
  }

  add(auditoriaItem: AuditoriaEntidade): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}/auth/auditoriaentidade`, auditoriaItem);
  }

  edit(auditoriaItem: AuditoriaEntidade): Observable<any> {
      return this.http.put(`${environment.baseUrl}/auth/auditoriaentidade`, auditoriaItem);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/auth/auditoriaentidade/${id}`);
  }
}
