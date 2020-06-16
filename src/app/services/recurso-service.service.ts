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

lista(): Observable<Recurso[]> {
  return this.http.get<Recurso[]>(environment.baseUrl + '/recurso/list');
}

listar2(): any {
  return this.http.get(environment.baseUrl + 'auth/recursos');
}

add(recurso: Recurso) {

  return this.http.post<any>(environment.baseUrl + '/auth/recurso', recurso);
}

remove(recurso: Recurso) {
  return this.http.post(environment.baseUrl + '/recurso/remove', recurso);
}


edit(recurso: Recurso) {
  return this.http.put(environment.baseUrl + '/recurso/edit', recurso);
}

getById(id: any) {
  return this.http.get<Recurso>(environment.baseUrl + '/recurso/' + id);
}

}
