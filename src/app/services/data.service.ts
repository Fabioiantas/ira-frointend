import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FilterMonitoramentoRecurso } from '../models/filter-monitoramento-recurso';
import { FormGroup } from '@angular/forms';
import { MonitoramentoLaudo } from '../models/monitoramentoLaudo';
import { FonteEmissao } from '../models/fonteEmissao';
import { FonteEmissora } from '../models/fonte-emissora';

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

  public fonteEmissao: FonteEmissao;
  public fonteEmissaoBehavior = new BehaviorSubject(this.fonteEmissao);
  curFonteEmissao = this.fonteEmissaoBehavior.asObservable();

  constructor() { }

  changeFilter(filter: FormGroup) {
    this.filterSourceBehavior.next(filter);
  }

  changeLaudo(laudo: MonitoramentoLaudo) {
    this.laudoBehavior.next(laudo);
  }

  changeFonteEmissora(fonte: FonteEmissao) {
    this.fonteEmissaoBehavior.next(fonte);
  }
}
