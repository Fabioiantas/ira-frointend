import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuditoriaNivelItRequisito } from 'src/app/models/auditoriaNivelItRequisito';
import { TipoAtividade } from 'src/app/models/tipoatividade';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaNivelItRequisitoService {

  // --service
  constructor(private http: HttpClient, private router: Router) {}

  list(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/nivelitrequisito`);
  }

  getById(id: any) {
    return this.http.get<AuditoriaNivelItRequisito>(environment.baseUrl + '/auth/nivelitrequisito/' + id);
  }

  getRequisitosByNivelItemId(id: any): Observable<any> {
    return this.http.get<AuditoriaNivelItRequisito>(environment.baseUrl + '/auth/nivelitrequisitobyitem/' + id);
  }

  getAtividadesExistsAuditoria() {
    return this.http.get<TipoAtividade>(`${environment.baseUrl}/auth/atividadesexistsauditoria`);
  }

  add(auditoriaItemReq: AuditoriaNivelItRequisito): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}/auth/nivelitrequisito`, auditoriaItemReq);
  }

  edit(auditoriaItemReq: AuditoriaNivelItRequisito): Observable<any> {
      return this.http.put(`${environment.baseUrl}/auth/nivelitrequisito`, auditoriaItemReq);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/auth/nivelitrequisito/${id}`);
  }
}
