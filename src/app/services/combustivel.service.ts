import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TipoCombustivel } from '../models/tipoCombustivel';

@Injectable({
  providedIn: 'root'
})
export class CombustivelService {

  constructor(private http: HttpClient, private router: Router) { }

  getList(): any{
    return this.http.get(environment.baseUrl + '/auth/combustiveis');
  }

  list(): any{
    return this.http.get(environment.baseUrl + '/auth/combustiveisl');
  }

  remove(id) {
    return this.http.delete(environment.baseUrl + '/auth/combustivel/' + id);
  }

  add(combustivel: TipoCombustivel) {
    return this.http.post<any>(`${environment.baseUrl}/auth/combustivel`, combustivel);
  }


  edit(combustivel: TipoCombustivel) {
    return this.http.put(`${environment.baseUrl}/auth/combustivel`, combustivel);
  }

  getById(id: any) {
    return this.http.get<TipoCombustivel>(environment.baseUrl + '/auth/combustivel/' + id);
  }
}
