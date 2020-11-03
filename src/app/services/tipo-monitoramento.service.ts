import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoMonitoramento } from '../models/tipoMonitoramento';

@Injectable({
  providedIn: 'root'
})
export class TipoMonitoramentoService {

  constructor(private http: HttpClient, private router: Router) { }
  // TIPO MONITORAMENTO

  getList(): Observable<any> {
    return this.http.get<TipoMonitoramento>(`${environment.baseUrl}/auth/tipomonilist`);
  }

  listar(): any {
    return this.http.get(`${environment.baseUrl}/auth/tipomonilista`);
  }

  getTipoMonitoramentoById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/tipomonitoramento/${id}`);
  }

  getParamByTipoMonitoramentoId(tipoMonitoramentoId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/tipomonitoramentoparam/${tipoMonitoramentoId}`);
  }

  add(tipoMonitoramento: TipoMonitoramento): Observable<TipoMonitoramento> {
    return this.http.post<TipoMonitoramento>(environment.baseUrl + '/auth/tipomonitoramento', tipoMonitoramento);
  }

  edit(tipoMonitoramento: TipoMonitoramento): Observable<TipoMonitoramento> {
    return this.http.put<TipoMonitoramento>(`${environment.baseUrl}/auth/tipomonitoramento`, tipoMonitoramento);
  }

  remove(id: any) {
    return this.http.delete(environment.baseUrl + '/auth/tipomonitoramento/' + id);
  }

}
