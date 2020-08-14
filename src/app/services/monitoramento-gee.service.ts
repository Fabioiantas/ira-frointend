import { Injectable } from '@angular/core';
import { FilterGee } from '../models/filter-gee';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MonitoramentoGee } from '../models/monitoramentoGee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitoramentoGeeService {

  constructor(private http: HttpClient, private router: Router) { }

  create(filter: FilterGee): Observable<MonitoramentoGee> {
    return this.http.post<MonitoramentoGee>(environment.baseUrl + '/auth/gee', filter);
  }

  findMonitoramento(filter: FilterGee): Observable<MonitoramentoGee> {
    return this.http.post<MonitoramentoGee>(environment.baseUrl + '/auth/findgee', filter);
  }
}
