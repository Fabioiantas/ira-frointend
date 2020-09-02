import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Recurso } from '../models/recurso';

@Injectable({
  providedIn: 'root'
})
export class RecursoServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  listar(): any {
    return this.http.get(environment.baseUrl + '/auth/recursos');
  }

  list(): any {
    return this.http.get(environment.baseUrl + '/auth/recursolist');
  }

  add(recurso: Recurso) {

    return this.http.post<any>(environment.baseUrl + '/auth/recurso', recurso);
  }

  remove(id) {
    return this.http.delete(environment.baseUrl + '/auth/recurso/' + id);
  }


  edit(recurso: Recurso) {
    return this.http.put(environment.baseUrl + '/auth/recurso', recurso);
  }

  getById(id: any) {
    return this.http.get<Recurso>(environment.baseUrl + '/auth/recurso/' + id);
  }

}
