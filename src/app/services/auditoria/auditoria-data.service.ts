import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaDataService {

  public filterAuditoriaEntidade: FormGroup = null;
  public filterAuditoriaEntidadeBehavior = new BehaviorSubject(this.filterAuditoriaEntidade);
  curFilterAuditoriaEntidade = this.filterAuditoriaEntidadeBehavior.asObservable();

  constructor() { }

  changeAuditoriaEntidade(filter: FormGroup) {
    this.filterAuditoriaEntidadeBehavior.next(filter);
  }
}
