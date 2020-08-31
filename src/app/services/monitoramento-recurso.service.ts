import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FilterMonitoramentoRecurso } from '../models/filter-monitoramento-recurso';
import { environment } from 'src/environments/environment';
import { MonitoramentoRecurso } from '../models/monitoramentoRecurso';

@Injectable({
  providedIn: 'root'
})
export class MonitoramentoRecursoService {

  constructor(private http: HttpClient, private router: Router) { }

  create(filter: FilterMonitoramentoRecurso): Observable<MonitoramentoRecurso> {
    return this.http.post<MonitoramentoRecurso>(`${environment.baseUrl}/auth/monitoramento`, filter);
  }

  findMonitoramento(filter: FilterMonitoramentoRecurso): Observable<MonitoramentoRecurso> {
    return this.http.post<MonitoramentoRecurso>(`${environment.baseUrl}/auth/findmonitoramento`, filter);
  }

  findFonte(id: any): Observable<any> {
    return this.http.get<MonitoramentoRecurso>(`${environment.baseUrl}/auth/monitoramento/${id}`);
  }

  findById(id: any): Observable<any> {
    return this.http.get<MonitoramentoRecurso>(`${environment.baseUrl}/auth/monitoramento/${id}`);
  }
}
