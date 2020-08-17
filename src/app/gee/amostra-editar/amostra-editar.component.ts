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
  amostraGee: AmostraGee;


  public onClose: Subject<AmostraGee>;
  loading = false;

  constructor(private dialogBox: DialogBoxService,
              private amostraService: AmostraService,
              public modalRef: BsModalRef) { }

  ngOnInit() {
    console.log('a: ' + JSON.stringify(this.amostraGee));
    this.onClose = new Subject();
  }

  public closeModal(): void {
    this.onClose.next(this.amostraGee);
    this.modalRef.hide();
  }

  salvar() {
    if (!this.amostraGee.dt_amostra || !this.amostraGee.cd_unidade_padrao || !this.amostraGee.qt_consumo_total) {
      return this.dialogBox.show('É nescessário preencher todos os campos', 'Warning');
    }
    this.loading = true;
    this.amostraGee.dt_amostra = this.amostraGee.dt_amostra = moment(this.amostraGee.dt_amostra).format('YYYY-MM-DD');
    this.amostraService.editar(this.amostraGee).subscribe(data => {
      this.loading = false;
      this.closeModal();
    }, () => this.loading = false);
  }
}
