import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Recurso } from '../models/recurso';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recurso',
  templateUrl: './Recurso.component.html',
  styleUrls: ['./Recurso.component.css']
})
export class RecursoComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  lista(): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(environment.baseUrl + '/Recurso/list');
  }

  add(recurso: Recurso) {
    return this.http.post(environment.baseUrl + '/Recurso/add', Recurso);
  }

  remove(recurso: Recurso) {
    return this.http.post(environment.baseUrl + '/Recurso/remove', Recurso);
  }


  edit(recurso: Recurso) {
    return this.http.put(environment.baseUrl + '/Recurso/edit', Recurso);
  }

  getById(id: any) {
    return this.http.get<Recurso>(environment.baseUrl + '/Recurso/id/' + id);
  }

}
