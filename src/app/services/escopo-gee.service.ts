import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EscopoGeeService {

  constructor(private http: HttpClient, private router: Router) { }

  getList(): any{
    return this.http.get(environment.baseUrl + '/auth/escopos');
  }
}
