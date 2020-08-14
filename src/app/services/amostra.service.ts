import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { AmostraGee } from '../models/amostraGee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmostraService {

  constructor(private http: HttpClient, private router: Router) { }

  findAmostra(id: any): Observable<AmostraGee> {
    return this.http.get<AmostraGee>(environment.baseUrl + '/auth/amostras/' + id);
  }

}
