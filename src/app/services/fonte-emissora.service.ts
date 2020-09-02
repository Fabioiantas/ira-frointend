import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FonteEmissora } from '../models/fonte-emissora';

@Injectable({
  providedIn: 'root'
})
export class FonteEmissoraService {

  constructor(private http: HttpClient, private router: Router) { }

  listar(): any {
    return this.http.get(environment.baseUrl + '/auth/fonteemissoras');
  }

  list(): any {
    return this.http.get(environment.baseUrl + '/auth/fonteemissoralist');
  }

  add(fonteemissora: FonteEmissora) {

    return this.http.post<any>(environment.baseUrl + '/auth/fonteemissora', fonteemissora);
  }

  remove(id) {
    return this.http.delete(environment.baseUrl + '/auth/fonteemissora/' + id);
  }


  edit(fonteemissora: FonteEmissora) {
    return this.http.put(environment.baseUrl + '/auth/fonteemissora', fonteemissora);
  }

  getById(id: any) {
    return this.http.get<FonteEmissora>(environment.baseUrl + '/auth/fonteemissora/' + id);
  }
}
