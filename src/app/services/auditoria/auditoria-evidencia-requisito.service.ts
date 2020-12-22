import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaEvidenciaRequisitoService {

  // --service
  constructor(private http: HttpClient, private router: Router) {}

  getByRequisitoId(id: any) {
    return this.http.get<any>(environment.baseUrl + '/auth/evidenciarequisito/' + id);
  }

  add(arquivo: any): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}/auth/evidenciarequisito`, arquivo);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/auth/evidenciarequisito/${id}`);
  }
}
