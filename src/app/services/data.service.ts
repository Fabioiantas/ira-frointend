import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FormGroup } from '@angular/forms';
import { MonitoramentoLaudo } from '../models/monitoramentoLaudo';
import { FontesEntidade } from '../models/fontesEntidade';
import { MonitoramentoRecursoAmostra } from '../models/monitoramentoRecursoAmostra';
import { Parametro } from '../models/Parametro';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public filterMonitorameto: FormGroup = null;
  public filterSourceBehavior = new BehaviorSubject(this.filterMonitorameto);
  currentFilter = this.filterSourceBehavior.asObservable();

  public filterTalhao: FormGroup = null;
  public filterTalhaoSourceBehavior = new BehaviorSubject(this.filterTalhao);
  currentFilterTalhao = this.filterTalhaoSourceBehavior.asObservable();

  public laudo: MonitoramentoLaudo = null;
  public laudoBehavior = new BehaviorSubject(this.laudo);
  currentLaudo = this.laudoBehavior.asObservable();

  public amostra: MonitoramentoRecursoAmostra = null;
  public amostraBehavior = new BehaviorSubject(this.amostra);
  currentAmostra = this.amostraBehavior.asObservable();

  public fontesEntidade: FontesEntidade = null;
  public fontesEntidadeBehavior = new BehaviorSubject(this.fontesEntidade);
  curFonteEmissao = this.fontesEntidadeBehavior.asObservable();

  public parametro: any = null;
  public parametroBehavior = new BehaviorSubject(this.parametro);
  curParametro = this.parametroBehavior.asObservable();

  constructor() { }

  changeFilter(filter: FormGroup) {
    this.filterSourceBehavior.next(filter);
  }

  changeTalhaoFilter(filter: FormGroup) {
    this.filterTalhaoSourceBehavior.next(filter);
  }

  changeLaudo(laudo: MonitoramentoLaudo) {
    this.laudoBehavior.next(laudo);
  }

  changeAmostra(amostra: MonitoramentoRecursoAmostra) {
    this.amostraBehavior.next(amostra);
  }

  changeFonteEmissao(fontesEntidade: FontesEntidade) {
    this.fontesEntidadeBehavior.next(fontesEntidade);
  }

  changeParametro(parametro: Parametro) {
    this.parametroBehavior.next(parametro);
  }
}
