import { ActivatedRoute } from '@angular/router';
import { AuditoriaEntidadeItRequisitoService } from './../../services/auditoria/auditoria-entidade-it-requisito.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuditoriaEntidadeItRequisito } from 'src/app/models/auditoriaEntidadeItRequisito';
import { AuditoriaEvidenciaRequisto } from 'src/app/models/auditoria/auditoriaEvidenciaRequisito';
import { AuditoriaEvidenciaService } from 'src/app/services/auditoria/auditoria-evidencia.service';

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
  loading = false;
  arquivo: AuditoriaEvidenciaRequisto;
  byteArray: string | ArrayBuffer;
  file: any;
  public onClose: Subject<AuditoriaEntidadeItRequisito>;


  constructor(private auditoriaEvidenciaService: AuditoriaEvidenciaService,
              private dialogBox: DialogBoxService,
              public modalRef: BsModalRef) { }

  ngOnInit() {
    this.onClose = new Subject();
    this.auditoriaEntidadeRequisito = new AuditoriaEntidadeItRequisito();
    this.auditoriaEntidadeRequisito.id = this.auditoriaEntidadeItRequisito.id;
    this.auditoriaEntidadeRequisito.ie_conforme = this.auditoriaEntidadeItRequisito.ie_conforme;
    // tslint:disable-next-line:max-line-length
    this.auditoriaEntidadeRequisito.dt_prazo_adequacao = new Date(this.auditoriaEntidadeItRequisito.dt_prazo_adequacao ? this.auditoriaEntidadeItRequisito.dt_prazo_adequacao : '');
    this.auditoriaEntidadeRequisito.ds_observacao = this.auditoriaEntidadeItRequisito.ds_observacao;
  }

  public closeModal(): void {
    this.onClose.next(this.auditoriaEntidadeItRequisito);
    this.modalRef.hide();
  }

  prepareFile(event) {
    const doc: any = document;
    const file = doc.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    if (file) {
      reader.onload = (e) => {
        this.byteArray = reader.result;
        if (new Blob([this.byteArray.toString()]).size > 12000000) {
          this.dialogBox.show('Arquivo deve ser menor que 10MB!', 'ERROR');
          this.byteArray = null;
          return;
        }
      };
    }
    reader.readAsDataURL(file);
  }

  salvar() {
    this.auditoriaEvidenciaService.add(this.auditoriaEntidadeRequisito).subscribe(data => {
      this.dialogBox.show('Requisito Auditado com sucesso!', 'OK');
      console.log(JSON.stringify(data));
      this.closeModal();
    });
  }

  clearDate() {
    this.auditoriaEntidadeRequisito.dt_prazo_adequacao = null;
  }

}
