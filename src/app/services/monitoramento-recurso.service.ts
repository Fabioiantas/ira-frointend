import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FilterMonitoramentoRecurso } from '../models/filter-monitoramento-recurso';
import { environment } from 'src/environments/environment';
import { MonitoramentoRecurso } from '../models/monitoramentoRecurso';
import { MonitoramentoLaudo } from '../models/monitoramentoLaudo';
import { MonitoramentoRecursoAmostra } from '../models/monitoramentoRecursoAmostra';

@Injectable({
  providedIn: 'root'
})
export class MonitoramentoRecursoService {

  constructor(private http: HttpClient, private router: Router) { }

  create(filter: FilterMonitoramentoRecurso): Observable<MonitoramentoRecurso> {
    return this.http.post<MonitoramentoRecurso>(`${environment.baseUrl}/auth/monitoramento`, filter);
  }

  createLaudo(laudo: MonitoramentoLaudo): Observable<MonitoramentoLaudo> {
    return this.http.post<MonitoramentoLaudo>(`${environment.baseUrl}/auth/laudo`, laudo);
  }

  createAmostra(amostra: MonitoramentoRecursoAmostra): Observable<MonitoramentoRecursoAmostra> {
    return this.http.post<MonitoramentoRecursoAmostra>(`${environment.baseUrl}/auth/resultado`, amostra);
  }

  findLaudos(filter: FilterMonitoramentoRecurso): Observable<MonitoramentoRecurso> {
    return this.http.post<MonitoramentoRecurso>(`${environment.baseUrl}/auth/findlaudos`, filter);
  }

  findFonte(id: any): Observable<any> {
    return this.http.get<MonitoramentoRecurso>(`${environment.baseUrl}/auth/monitoramento/${id}`);
  }

  findById(id: any): Observable<any> {
    return this.http.get<MonitoramentoRecurso>(`${environment.baseUrl}/auth/monitoramento/${id}`);
  }

  // AMOSTRAS
  findAmostras(id: any): Observable<any> {
    return this.http.get<MonitoramentoRecursoAmostra>(`${environment.baseUrl}/auth/resultado/${id}`);
  }

  remove(id) {
    return this.http.delete(environment.baseUrl + '/auth/resultado/' + id);
  }
}
