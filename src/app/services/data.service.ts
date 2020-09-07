import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FilterMonitoramentoRecurso } from '../models/filter-monitoramento-recurso';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public filterMonitorameto: FormGroup;
  public filterSourceBehavior = new BehaviorSubject(this.filterMonitorameto);
  currentFilter = this.filterSourceBehavior.asObservable();

  constructor() { }

  changeFilter(filter: FormGroup) {
    this.filterSourceBehavior.next(filter);
  }
}
