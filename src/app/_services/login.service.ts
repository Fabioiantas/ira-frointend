import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials): Observable<any>{
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(environment.baseUrl + '/api-farmacos/login?user='+ credentials.email + "&password="+ credentials.password, {responseType: 'text' as 'json'});
  }
}
