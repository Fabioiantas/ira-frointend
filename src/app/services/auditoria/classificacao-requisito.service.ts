import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ClassificacaoRequisito } from 'src/app/models/classificacaoRequisito';

@Injectable({
  providedIn: 'root'
})
export class ClassificacaoRequisitoService {

  constructor(private http: HttpClient, private router: Router) {}

  list(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/classificacaorequisito`);
  }

  getById(id: any) {
    return this.http.get<ClassificacaoRequisito>(environment.baseUrl + '/auth/classificacaorequisito/' + id);
  }

  add(classificacaoRequisito: ClassificacaoRequisito): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}/auth/classificacaorequisito`, classificacaoRequisito);
  }

  edit(classificacaoRequisito: ClassificacaoRequisito): Observable<any> {
      return this.http.put(`${environment.baseUrl}/auth/classificacaorequisito`, classificacaoRequisito);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/auth/classificacaorequisito/${id}`);
  }
}
