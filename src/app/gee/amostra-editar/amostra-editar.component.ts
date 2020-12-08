import { AmostraService } from './../../services/amostra.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AmostraGee } from './../../models/amostraGee';
import { FilterGee } from './../../models/filter-gee';
import { MonitoramentoGee } from './../../models/monitoramentoGee';
import { Component, OnInit } from '@angular/core';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-amostra-editar',
  templateUrl: './amostra-editar.component.html',
  styleUrls: ['./amostra-editar.component.sass']
})
export class AmostraEditarComponent implements OnInit {

  monitoramentoGee: MonitoramentoGee;
  filterGee: FilterGee;
  amostraGee: any;
  amostra: AmostraGee;
  kmTotal: any;
  qtConsumo: any;


  public onClose: Subject<AmostraGee>;
  loading = false;

  constructor(private dialogBox: DialogBoxService,
              private amostraService: AmostraService,
              public modalRef: BsModalRef) { }

  ngOnInit() {
    console.log('a: ' + this.qtConsumo);
    this.amostra = new AmostraGee();
    this.amostra.id = this.amostraGee.id;
    this.amostra.monitoramento_gee_id = this.amostraGee.monitoramento_gee_id;
    this.amostra.dt_amostra = new Date(this.amostraGee.dt_amostra);
    this.amostra.cd_unidade_padrao = this.amostraGee.cd_unidade_padrao;
    this.amostra.qt_consumo_total = this.amostraGee.qt_consumo_total;
    this.kmTotal = (this.amostra.qt_consumo_total * this.qtConsumo).toFixed(2);
    this.onClose = new Subject();
  }

  public closeModal(): void {
    this.onClose.next(this.amostra);
    this.modalRef.hide();
  }

  salvar() {
    if (!this.amostra.dt_amostra || !this.amostra.cd_unidade_padrao || !this.amostra.qt_consumo_total) {
      return this.dialogBox.show('É nescessário preencher todos os campos', 'Warning');
    }
    this.loading = true;
    this.amostraService.editar(this.amostra).subscribe(data => {
      this.loading = false;
      this.closeModal();
    }, () => this.loading = false);
  }

  changeQuilometragem() {
    this.amostra.qt_consumo_total = Number((this.kmTotal / this.qtConsumo).toFixed(2));
  }

}
