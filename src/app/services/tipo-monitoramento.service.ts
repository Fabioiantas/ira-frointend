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
}
