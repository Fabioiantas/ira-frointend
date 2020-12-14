import { MonitoramentoGee } from 'src/app/models/monitoramentoGee';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GeeDataServiceService {

  public filterMonitorametoGee: MonitoramentoGee = null;
  public filterMonitoramentoGeeBehavior = new BehaviorSubject(this.filterMonitorametoGee);
  currentMonitoramentoGee = this.filterMonitoramentoGeeBehavior.asObservable();


  constructor() { }

  changeMonitoramentoGee(monitoramentoGee: MonitoramentoGee) {
    this.filterMonitoramentoGeeBehavior.next(monitoramentoGee);
  }

}
