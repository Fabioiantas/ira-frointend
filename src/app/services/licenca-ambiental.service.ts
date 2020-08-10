import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LicencaAmbiental } from '../models/licencaAmbiental';
import { LicencaIap } from '../models/licencaIap';

@Injectable({
  providedIn: 'root'
})
export class LicencaAmbientalService {
  constructor(private http: HttpClient, private router: Router) { }

  listar(): any {
    return this.http.get(environment.baseUrl + '/auth/licenca');
  }

  getAll(): any {
    return this.http.get(environment.baseUrl + '/auth/la');
  }

  getFilha(id): any {
    return this.http.get(environment.baseUrl + '/auth/filha/' + id);
  }

  add(licencaAmbiental: LicencaAmbiental) {
    return this.http.post<any>(environment.baseUrl + '/auth/licenca', licencaAmbiental);
  }

  remove(id) {
    return this.http.delete(environment.baseUrl + '/auth/licenca/' + id);
  }

  edit(licencaAmbiental: LicencaAmbiental) {
    return this.http.put(environment.baseUrl + '/auth/licenca', licencaAmbiental);
  }

  getById(id: any) {
    return this.http.get<LicencaAmbiental>(environment.baseUrl + '/auth/licenca/' + id);
  }

  getLicencaById(id: any) {
    return this.http.get<LicencaAmbiental>(environment.baseUrl + '/auth/la/' + id);
  }

  licenciar(licencaAmbiental: LicencaAmbiental) {
    return this.http.put<any>(environment.baseUrl + '/auth/licenciar', licencaAmbiental);
  }

  renovar(licencaAmbiental: LicencaAmbiental) {
    return this.http.post<any>(environment.baseUrl + '/auth/renova', licencaAmbiental);
  }

  protocolar(licencaAmbiental: LicencaAmbiental) {
    return this.http.put<any>(environment.baseUrl + '/auth/protocolar', licencaAmbiental);
  }

  download(licencaIap: LicencaIap) {
    return this.http.get<any>('http://www.protocolo.seap.pr.gov.br/protocolo/pesquisaGeral.do;?action=pesquisar&numProtocolo=152913591');
  }
}
