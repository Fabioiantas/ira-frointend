import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Tecnico } from '../_models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient, private router: Router) {}

  lista(): Observable<Tecnico[]>{
    return this.http.get<Tecnico[]>(environment.baseUrl + '/tecnico');
  }

  add() {
    return this.http.post<Tecnico>(environment.baseUrl + '/tecnico/add', {});
  }

  getById(id: number) {
    return this.http.get<Tecnico>(environment.baseUrl + `/tecnico/${id}`);
  }
}
