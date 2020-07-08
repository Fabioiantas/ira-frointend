import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';

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

  getLicencaSituacao(situacao: string): any {
    return this.http.get(environment.baseUrl + '/auth/getlicencasituacao/' + situacao);
  }

  acao (licenca) {
    if (licenca.nr_licenca_ambiental === null && licenca.nr_protocolo_novo === null) {
      this.router.navigate(['/licenciamento/' + licenca.id]);
    } else if (licenca.nr_licenca_ambiental !== null && licenca.nr_protocolo_novo === null) {
      this.router.navigate(['/protocolacao/' + licenca.id]);
    } else {
      this.router.navigate(['/renova/' + licenca.id]);
    }
  }

  getProximaAcao(licenca): string {
    if (licenca.nr_licenca_ambiental === null && licenca.nr_protocolo_novo === null) {
      return 'Licenciar';
    } else if (licenca.nr_licenca_ambiental !== null && licenca.nr_protocolo_novo === null) {
      return 'Protocolar em ' + moment(licenca.dt_validade_protocolo).format('DD/MM/YYYY');
    } else {
      return 'Renovar';
    }
  }



}
