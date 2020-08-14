import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CombustivelService {

  constructor(private http: HttpClient, private router: Router) { }

  getList(): any{
    return this.http.get(environment.baseUrl + '/auth/combustiveis');
  }

}
