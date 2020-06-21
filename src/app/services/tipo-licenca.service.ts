import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoLicenca } from '../models/tipoLicenca';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TipoLicencaService {
  constructor(private http: HttpClient, private router: Router) { }

  listar(): any {
    return this.http.get(environment.baseUrl + '/auth/tipolicencas');
  }
  
  listaTipoLicenca(): any {
    return this.http.get(environment.baseUrl + '/auth/tipolicencalista');
  }
   
  add(tipoAtividade: TipoLicenca) {
  
    return this.http.post<any>(environment.baseUrl + '/auth/tipolicenca', tipoAtividade);
  }
  
  remove(id) {
    return this.http.delete(environment.baseUrl + '/auth/tipolicenca/' + id);
  }
  
  
  edit(tipoAtividade: TipoLicenca) {
    return this.http.put(environment.baseUrl + '/auth/tipolicenca', tipoAtividade);
  }
  
  getById(id: any) {
    return this.http.get<TipoLicenca>(environment.baseUrl + '/auth/tipolicenca/' + id);
  }
}
