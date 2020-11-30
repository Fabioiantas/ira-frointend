import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuditoriaEntidadeItRequisito } from 'src/app/models/auditoriaEntidadeItRequisito';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaEntidadeItRequisitoService {

  // --service
  constructor(private http: HttpClient, private router: Router) {}

  list(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/auditoriaentidadeitrequisito`);
  }

  getById(id: any) {
    return this.http.get<AuditoriaEntidadeItRequisito>(environment.baseUrl + '/auth/auditoriaentidadeitrequisito/' + id);
  }

  add(auditoriaEntidadeItRequisito: AuditoriaEntidadeItRequisito): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}/auth/auditoriaentidadeitrequisito`, auditoriaEntidadeItRequisito);
  }

  edit(auditoriaEntidadeItRequisito: AuditoriaEntidadeItRequisito): Observable<any> {
      return this.http.put(`${environment.baseUrl}/auth/auditoriaentidadeitrequisito`, auditoriaEntidadeItRequisito);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/auth/auditoriaentidadeitrequisito/${id}`);
  }
}
