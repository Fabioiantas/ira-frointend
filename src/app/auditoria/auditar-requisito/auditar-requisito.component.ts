import { AuditoriaEntidadeItRequisitoService } from './../../services/auditoria/auditoria-entidade-it-requisito.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuditoriaEntidadeItRequisito } from 'src/app/models/auditoriaEntidadeItRequisito';

@Component({
  selector: 'app-auditar-requisito',
  templateUrl: './auditar-requisito.component.html',
  styleUrls: ['./auditar-requisito.component.sass']
})
export class AuditarRequisitoComponent implements OnInit {

  auditoriaEntidadeItRequisito: any;
  auditoriaEntidadeRequisito: AuditoriaEntidadeItRequisito;
  item: any;
  auditoria: any;
  public onClose: Subject<AuditoriaEntidadeItRequisito>;
  loading = false;

  constructor(private auditoriaEntidadeItRequisitoService: AuditoriaEntidadeItRequisitoService,
              private dialogBox: DialogBoxService,
              public modalRef: BsModalRef) { }

  ngOnInit() {
    console.log('auditoria ' + JSON.stringify(this.auditoria));
    this.onClose = new Subject();
    this.auditoriaEntidadeRequisito = new AuditoriaEntidadeItRequisito();
    this.auditoriaEntidadeRequisito.id = this.auditoriaEntidadeItRequisito.id;
    this.auditoriaEntidadeRequisito.ie_conforme = this.auditoriaEntidadeItRequisito.ie_conforme;
    this.auditoriaEntidadeRequisito.dt_prazo_adequacao = this.auditoriaEntidadeItRequisito.dt_prazo_adequacao;
    this.auditoriaEntidadeRequisito.ds_observacao = this.auditoriaEntidadeItRequisito.ds_observacao;
  }

  public closeModal(): void {
    this.onClose.next(this.auditoriaEntidadeItRequisito);
    this.modalRef.hide();
  }

  salvar() {
    this.auditoriaEntidadeItRequisitoService.edit(this.auditoriaEntidadeRequisito).subscribe(data => {
      this.dialogBox.show('Requisito Auditado com sucesso!', 'OK');
      console.log(JSON.stringify(data));
      this.closeModal();
    });
    /* if (!this.amostraGee.dt_amostra || !this.amostraGee.cd_unidade_padrao || !this.amostraGee.qt_consumo_total) {
      return this.dialogBox.show('É nescessário preencher todos os campos', 'Warning');
    }
    this.loading = true;
    this.amostraService.editar(this.amostraGee).subscribe(data => {
      this.loading = false;
      this.closeModal();
    }, () => this.loading = false);*/
  }

}
