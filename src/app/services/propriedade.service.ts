import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropriedadeService {

  constructor(private http: HttpClient, private router: Router) { }

  byEntidade(id: any): any {
    return this.http.get(environment.baseUrl + '/auth/propriedade/' + id);
  }

  getById(id: any): any {
    return this.http.get(`${environment.baseUrl}/auth/getpropriedade/${id}`);
  }
}
