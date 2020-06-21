import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LicencaAmbiental } from '../models/licencaAmbiental';

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
}
