import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuditoriaNivelItem } from 'src/app/models/auditoriaNivelItem';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaNivelItemServiceService {

  // --service
  constructor(private http: HttpClient, private router: Router) {}

  list(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/nivelitem`);
  }

  getById(id: any) {
    return this.http.get<AuditoriaNivelItem>(environment.baseUrl + '/auth/nivelitem/' + id);
  }

  getByNivel(nivelId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/nivelitembynivel/${nivelId}`);
  }


  add(auditoriaNivelItem: AuditoriaNivelItem): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}/auth/nivelitem`, auditoriaNivelItem);
  }

  edit(auditoriaNivelItem: AuditoriaNivelItem): Observable<any> {
      return this.http.put(`${environment.baseUrl}/auth/nivelitem`, auditoriaNivelItem);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/auth/nivelitem/${id}`);
  }
}
