import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FilterMonitoramentoRecurso } from '../models/filter-monitoramento-recurso';
import { environment } from 'src/environments/environment';
import { MonitoramentoRecurso } from '../models/monitoramentoRecurso';
import { MonitoramentoLaudo } from '../models/monitoramentoLaudo';
import { MonitoramentoRecursoAmostra } from '../models/monitoramentoRecursoAmostra';
import { ResultadoAmostra } from '../models/resultadoAmostra';
import { AmostraResultadoParametro } from '../models/amostraResultadoParametro';

@Injectable({
  providedIn: 'root'
})
export class MonitoramentoRecursoService {

  constructor(private http: HttpClient, private router: Router) { }

  // MONITORAMENTO
  create(filter: FilterMonitoramentoRecurso): Observable<MonitoramentoRecurso> {
    return this.http.post<MonitoramentoRecurso>(`${environment.baseUrl}/auth/monitoramento`, filter);
  }

  getMonitoramentoById(monitoramentoId: any) {
    return this.http.get<any>(`${environment.baseUrl}/auth/monitoramentobyid/${monitoramentoId}`);
  }

  // LAUDO
  createLaudo(laudo: MonitoramentoLaudo): Observable<MonitoramentoLaudo> {
    return this.http.post<MonitoramentoLaudo>(`${environment.baseUrl}/auth/laudo`, laudo);
  }

  editLaudo(laudo: MonitoramentoLaudo): Observable<MonitoramentoLaudo> {
    return this.http.put<MonitoramentoLaudo>(`${environment.baseUrl}/auth/laudo`, laudo);
  }

  removeLaudo(id: any) {
    return this.http.delete(`${environment.baseUrl}/auth/laudo/${id}`);
  }

  findLaudos(filter: FilterMonitoramentoRecurso): Observable<MonitoramentoRecurso> {
    return this.http.post<MonitoramentoRecurso>(`${environment.baseUrl}/auth/findlaudos`, filter);
  }

  // AMOSTRA
  createAmostra(amostra: MonitoramentoRecursoAmostra): Observable<MonitoramentoRecursoAmostra> {
    return this.http.post<MonitoramentoRecursoAmostra>(`${environment.baseUrl}/auth/amostralaudo`, amostra);
  }

  editAmostraLaudo(amostra: MonitoramentoRecursoAmostra): Observable<MonitoramentoRecursoAmostra> {
    return this.http.put<MonitoramentoRecursoAmostra>(`${environment.baseUrl}/auth/amostralaudo`, amostra);
  }

  removeResultado(id: any) {
    return this.http.delete(`${environment.baseUrl}/auth/amostraresultado/${id}`);
  }

  findAmostras(id: any): Observable<any> {
    return this.http.get<MonitoramentoRecursoAmostra>(`${environment.baseUrl}/auth/amostraslaudo/${id}`);
  }

  findFonte(id: any): Observable<any> {
    return this.http.get<MonitoramentoRecurso>(`${environment.baseUrl}/auth/monitoramento/${id}`);
  }

  findById(id: any): Observable<any> {
    return this.http.get<MonitoramentoRecurso>(`${environment.baseUrl}/auth/monitoramento/${id}`);
  }

  // RESULTADO AMOSTRA
  getResultadoAmostra(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/getresultadoamostra/${id}`);
  }

  putResultado(resultado: any): Observable<ResultadoAmostra> {
    return this.http.put<ResultadoAmostra>(`${environment.baseUrl}/auth/resultado`, resultado);
  }

  // AMOSTRA TALHÃO
  getTalhaoByAmostra(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/amostratalhao/${id}`);
  }

  getTalhaoByPropriedade(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/gettalhaobypropriedade/${id}`);
  }

}
