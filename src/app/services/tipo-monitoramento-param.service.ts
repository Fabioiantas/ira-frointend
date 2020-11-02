import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TipoMonitoramentoParametros } from '../models/tipoMonitoramentoParametro';

@Injectable({
  providedIn: 'root'
})
export class TipoMonitoramentoParamService {

  constructor(private http: HttpClient, private router: Router) { }
  // TIPO MONITORAMENTO

  add(monitoramentoParam: TipoMonitoramentoParametros) {
    return this.http.post<any>(environment.baseUrl + '/auth/tipomonitoramentoparam', monitoramentoParam);
  }

  edit(monitoramentoParam: TipoMonitoramentoParametros) {
    return this.http.put(`${environment.baseUrl}/auth/tipomonitoramentoparam`, monitoramentoParam);
  }

  remove(id: any) {
    return this.http.delete(environment.baseUrl + '/auth/tipomonitoramentoparam/' + id);
  }
}
