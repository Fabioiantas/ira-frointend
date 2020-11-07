import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuditoriaRequisito } from 'src/app/models/auditoriaRequisito';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaRequisitoService {

  // --service
  constructor(private http: HttpClient, private router: Router) {}

  list(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/auditoriarequisito`);
  }

  getById(id: any) {
    return this.http.get<AuditoriaRequisito>(environment.baseUrl + '/auth/auditoriarequisito/' + id);
  }

  add(auditoriaRequisito: AuditoriaRequisito): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}/auth/auditoriarequisito`, auditoriaRequisito);
  }

  edit(auditoriaRequisito: AuditoriaRequisito): Observable<any> {
      return this.http.put(`${environment.baseUrl}/auth/auditoriarequisito`, auditoriaRequisito);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/auth/auditoriarequisito/${id}`);
  }
}
