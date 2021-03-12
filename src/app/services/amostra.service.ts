import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AmostraGee } from 'src/app/models/amostraGee';


@Injectable({
  providedIn: 'root'
})
export class AmostraService {

  constructor(private http: HttpClient, private router: Router) { }

  findAmostra(id: any): Observable<AmostraGee[]> {
    return this.http.get<AmostraGee[]>(environment.baseUrl + '/auth/amostras/' + id);
  }

  salvar(amostraGee: AmostraGee) {
    return this.http.post<AmostraGee>(environment.baseUrl + '/auth/amostra', amostraGee);
  }

  editar(amostraGee: AmostraGee) {
    return this.http.put<AmostraGee>(environment.baseUrl + '/auth/amostra', amostraGee);
  }

  remover(id: any) {
    return this.http.delete(environment.baseUrl + '/auth/amostra/' + id);
  }

}
