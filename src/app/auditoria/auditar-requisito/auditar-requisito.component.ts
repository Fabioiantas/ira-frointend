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
  item: any;
  auditoria: any;
  public onClose: Subject<AuditoriaEntidadeItRequisito>;
  loading = false;

  constructor(private dialogBox: DialogBoxService,
              public modalRef: BsModalRef) { }

  ngOnInit() {
    console.log('auditoria ' + JSON.stringify(this.auditoria));
    this.onClose = new Subject();
  }

  public closeModal(): void {
    this.onClose.next(this.auditoriaEntidadeItRequisito);
    this.modalRef.hide();
  }

  salvar() {
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
