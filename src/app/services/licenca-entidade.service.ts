import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LicencaEntidadeService {
  constructor(private http: HttpClient, private router: Router) { }

  getAll(): any {
    return this.http.get(environment.baseUrl + '/auth/licencaentidade');
  }

  getTotalProtocolar(id: string): any {
    return this.http.get(environment.baseUrl + '/auth/licencaprotocolar/' + id);
  }

  getTotalValidas(): any {
    return this.http.get(environment.baseUrl + '/auth/getvalidas');
  }

  getTotalSituacao(situacao: string): any {
    return this.http.get(environment.baseUrl + '/auth/gettotalsituacao/' + situacao);
  }



}
