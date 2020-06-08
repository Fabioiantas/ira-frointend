import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Produto } from '../_models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient, private router: Router) {}

  lista(): Observable<Produto[]>{
    return this.http.get<Produto[]>(environment.baseUrl + '/produto');
  }

  add() {
    return this.http.post<Produto>(environment.baseUrl + '/produto/add', {});
  }

  getById(id: number) {
    return this.http.get<Produto>(environment.baseUrl + `/produto/${id}`);
  }

}
