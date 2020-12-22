import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { Subject } from 'rxjs';
import { AuditoriaEvidenciaRequisto } from './../../models/auditoria/auditoriaEvidenciaRequisito';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ToastrService } from 'ngx-toastr';
import { AuditoriaEvidenciaRequisitoService } from 'src/app/services/auditoria/auditoria-evidencia-requisito.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-evidencia-requisito',
  templateUrl: './evidencia-requisito.component.html',
  styleUrls: ['./evidencia-requisito.component.sass']
})
export class EvidenciaRequisitoComponent implements OnInit {

  auditoriaEntidadeItRequisito: any;
  auditoria: any;
  item: any;
  evidencia = new AuditoriaEvidenciaRequisto();
  isAddEdit = false;
  arquivos: [];
  loading = false;
  byteArray: string | ArrayBuffer;
  file: any;

  public onClose: Subject<any>;

  constructor(public modalRef: BsModalRef,
              private dialogBox: DialogBoxService,
              private toastrService: ToastrService,
              private evidenciaRequisitoService: AuditoriaEvidenciaRequisitoService) { }

  ngOnInit() {
    this.onClose = new Subject();
    this.getByRequisitoId(this.auditoriaEntidadeItRequisito.id);
    console.log(('teste ' + JSON.stringify(this.auditoriaEntidadeItRequisito)));
  }

  public closeModal(): void {
    this.onClose.next(this.auditoriaEntidadeItRequisito);
    this.modalRef.hide();
  }

  getByRequisitoId(id: any) {
    this.loading = true;
    this.evidenciaRequisitoService.getByRequisitoId(id).subscribe(data => {
      this.arquivos = data;
      this.loading = false;
    }, () => this.loading = false);
  }

  prepareFile(event) {
    const doc: any = document;
    const file = doc.querySelector('input[type=file]').files[0];
    if (!file) { return; }

    const reader = new FileReader();
    if (file) {
      reader.onload = (e) => {
        this.byteArray = reader.result;
      };
    }
    reader.readAsDataURL(file);
  }

  save() {
    this.loading = true;
    const doc: any = document;
    const file = doc.querySelector('input[type=file]').files[0];

    this.evidencia.auditoria_entidade_it_requisito_id = this.auditoriaEntidadeItRequisito.id;
    this.evidencia.dt_evidencia = new Date(this.evidencia.dt_evidencia);
    this.evidencia.nm_arquivo = file.name;
    this.evidencia.arquivo = this.byteArray.toString();
    this.evidenciaRequisitoService.add(this.evidencia).subscribe(data => {
      this.showSuccess('Arquivo adicionado com sucesso!', 'Mensagem');
      this.evidencia = new AuditoriaEvidenciaRequisto();
      this.getByRequisitoId(this.auditoriaEntidadeItRequisito.id);
      this.byteArray = null;
      this.file = null;
      this.loading = false;
    },() => this.loading = false);
  }

  edit(evidencia: any) {
    console.log(JSON.stringify(evidencia));
    this.evidencia = new AuditoriaEvidenciaRequisto;
    this.evidencia.ds_evidencia = evidencia.ds_evidencia;
    this.evidencia.dt_evidencia = new Date(evidencia.dt_evidencia);
  }

  remover(id: string) {
    this.dialogBox.show('Confirma remoção do anexo?', 'CONFIRM').then(sim => {
      if (sim) {
        this.evidenciaRequisitoService.remove(id).subscribe(data => {
          this.showSuccess('Arquivo removido com sucesso!', 'Mensagem');
          this.getByRequisitoId(this.auditoriaEntidadeItRequisito.id);
        });
      }
    });
  }

  download(arquivo: any, nmArquivo: string) {
    UtilsService.downloadFile(UtilsService.dataURItoBlob(arquivo), '', nmArquivo);
  }

  showSuccess(message: string, title: string) {
    this.toastrService.success(message, title, {
      timeOut: 3000,
    });
  }

  showWarning(message: string, title: string) {
    this.toastrService.warning(message, title, {
      timeOut: 3000,
    });
  }

  showInfo(message: string, title: string) {
    this.toastrService.info(message, title, {
      timeOut: 3000,
    });
  }
}
