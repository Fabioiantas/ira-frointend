import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TipoAtividade } from '../models/tipoatividade';

@Injectable({
  providedIn: 'root'
})
export class TipoAtividadeService {

  constructor(private http: HttpClient, private router: Router) { }

  listar(): any {
    return this.http.get(environment.baseUrl + '/auth/tipoatividades');
  }
   
  add(tipoAtividade: TipoAtividade) {
  
    return this.http.post<any>(environment.baseUrl + '/auth/tipoatividade', tipoAtividade);
  }
  
  remove(id) {
    return this.http.delete(environment.baseUrl + '/auth/tipoatividade/' + id);
  }
  
  
  edit(tipoAtividade: TipoAtividade) {
    return this.http.put(environment.baseUrl + '/auth/tipoatividade', tipoAtividade);
  }
  
  getById(id: any) {
    return this.http.get<TipoAtividade>(environment.baseUrl + '/auth/tipoatividade/' + id);
  }
}
