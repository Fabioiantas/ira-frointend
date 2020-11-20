import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuditoriaNivel } from '../models/auditoriaNivel';
import { TipoAtividade } from '../models/tipoatividade';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaNivelService {

  constructor(private http: HttpClient, private router: Router) {}

  list(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/auditorianivel`);
  }

  getById(id: any) {
    return this.http.get<AuditoriaNivel>(environment.baseUrl + '/auth/auditorianivel/' + id);
  }

  getByTipoAtividadeId(id: any) {
    return this.http.get<AuditoriaNivel>(environment.baseUrl + '/auth/nivelbytipoatividade/' + id);
  }

  add(auditoriaNivel: AuditoriaNivel): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}/auth/auditorianivel`, auditoriaNivel);
  }

  edit(auditoriaNivel: AuditoriaNivel): Observable<any> {
      return this.http.put(`${environment.baseUrl}/auth/auditorianivel`, auditoriaNivel);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/auth/auditorianivel/${id}`);
  }
}
