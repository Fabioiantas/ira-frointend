import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaEvidenciaService {

  constructor(private http: HttpClient, private router: Router) {}

  getByLicencaId(id: any) {
    return this.http.get<any>(environment.baseUrl + '/auth/evidencia/' + id);
  }

  add(arquivo: any): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}/auth/evidencia`, arquivo);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/auth/evidencia/${id}`);
  }
}
