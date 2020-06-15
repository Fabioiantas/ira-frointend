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

lista(): Observable<Recurso[]> {
  return this.http.get<Recurso[]>(environment.baseUrl + '/recurso/list');
}

add(recurso: Recurso) {
  return this.http.post(environment.baseUrl + '/recurso/add', Recurso);
}

remove(recurso: Recurso) {
  return this.http.post(environment.baseUrl + '/recurso/remove', Recurso);
}


edit(recurso: Recurso) {
  return this.http.put(environment.baseUrl + '/recurso/edit', Recurso);
}

getById(id: any) {
  return this.http.get<Recurso>(environment.baseUrl + '/recurso/id/' + id);
}

}
