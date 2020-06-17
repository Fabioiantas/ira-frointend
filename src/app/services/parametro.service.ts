import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Parametro } from '../models/parametro';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(private http: HttpClient, private router: Router) { }

  listar(): any {
    return this.http.get(environment.baseUrl + '/auth/parametros');
  }
  
  add(parametro: Parametro) {
  
    return this.http.post<any>(environment.baseUrl + '/auth/parametro', parametro);
  }
  
  remove(id) {
    return this.http.delete(environment.baseUrl + '/auth/parametro/' + id);
  }
  
  
  edit(parametro: Parametro) {
    return this.http.put(environment.baseUrl + '/auth/parametro', parametro);
  }
  
  getById(id: any) {
    return this.http.get<Parametro>(environment.baseUrl + '/auth/parametro/' + id);
  }

}
