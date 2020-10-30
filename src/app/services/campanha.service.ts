import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Campanha } from '../_models/campanha';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {
  constructor(private http: HttpClient, private router: Router) {}

  lista(): Observable<Campanha[]> {
    return this.http.get<Campanha[]>(environment.baseUrl + '/campanha/list');
  }

  add(campanha: Campanha) {
    return this.http.post(environment.baseUrl + '/campanha/add', campanha);
  }

  remove(campanha: Campanha) {
    return this.http.post(environment.baseUrl + '/campanha/remove', campanha);
  }

  edit(campanha: Campanha) {
    return this.http.put(environment.baseUrl + '/campanha/edit', campanha);
  }

  getById(id: any) {
    return this.http.get<Campanha>(environment.baseUrl + '/campanha/id/' + id);
  }
}
