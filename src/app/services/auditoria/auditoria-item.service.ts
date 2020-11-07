import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuditoriaItem } from 'src/app/models/auditoriaItem';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaItemService {

  // --service
  constructor(private http: HttpClient, private router: Router) {}

  list(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/auditoriaitem`);
  }

  getById(id: any) {
    return this.http.get<AuditoriaItem>(environment.baseUrl + '/auth/auditoriaitem/' + id);
  }

  add(auditoriaItem: AuditoriaItem): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}/auth/auditoriaitem`, auditoriaItem);
  }

  edit(auditoriaItem: AuditoriaItem): Observable<any> {
      return this.http.put(`${environment.baseUrl}/auth/auditoriaitem`, auditoriaItem);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/auth/auditoriaitem/${id}`);
  }
}
