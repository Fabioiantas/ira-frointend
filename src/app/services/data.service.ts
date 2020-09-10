import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FilterMonitoramentoRecurso } from '../models/filter-monitoramento-recurso';
import { FormGroup } from '@angular/forms';
import { MonitoramentoLaudo } from '../models/monitoramentoLaudo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public filterMonitorameto: FormGroup;
  public filterSourceBehavior = new BehaviorSubject(this.filterMonitorameto);
  currentFilter = this.filterSourceBehavior.asObservable();

  public laudo: MonitoramentoLaudo;
  public laudoBehavior = new BehaviorSubject(this.laudo);
  currentLaudo = this.laudoBehavior.asObservable();

  constructor() { }

  changeFilter(filter: FormGroup) {
    this.filterSourceBehavior.next(filter);
  }

  changeLaudo(laudo: MonitoramentoLaudo) {
    this.laudoBehavior.next(laudo);
  }
}
