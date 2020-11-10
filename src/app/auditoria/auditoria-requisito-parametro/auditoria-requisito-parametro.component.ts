import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AuditoriaNivelItRequisito } from 'src/app/models/auditoriaNivelItRequisito';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-auditoria-requisito-parametro',
  templateUrl: './auditoria-requisito-parametro.component.html',
  styleUrls: ['./auditoria-requisito-parametro.component.sass']
})
export class AuditoriaRequisitoParametroComponent implements OnInit {

  // monitoramentoGee: MonitoramentoGee;
  // filterGee: FilterGee;
  // amostraGee: AmostraGee;
  auditoriaNivelItRequisito: AuditoriaNivelItRequisito;

  public onClose: Subject<AuditoriaNivelItRequisito>;
  loading = false;

  constructor(private dialogBox: DialogBoxService, public modalRef: BsModalRef) { }

  ngOnInit() {
    this.onClose = new Subject();
    console.log(JSON.stringify(this.onClose));
  }

  public closeModal(): void {
    this.onClose.next(this.auditoriaNivelItRequisito);
    this.modalRef.hide();
  }

  salvar() {
  //   if (!this.amostraGee.dt_amostra || !this.amostraGee.cd_unidade_padrao || !this.amostraGee.qt_consumo_total) {
  //     return this.dialogBox.show('É nescessário preencher todos os campos', 'Warning');
  //   }
  //   this.loading = true;
  //   this.amostraService.editar(this.amostraGee).subscribe(data => {
  //     this.loading = false;
  //     this.closeModal();
  //   }, () => this.loading = false);
   }
}
