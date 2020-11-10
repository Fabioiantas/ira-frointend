import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AuditoriaNivelItRequisito } from 'src/app/models/auditoriaNivelItRequisito';
import { ClassificacaoRequisito } from 'src/app/models/classificacaoRequisito';
import { AuditoriaNivelItRequisitoService } from 'src/app/services/auditoria/auditoria-nivel-it-requisito.service';
import { ClassificacaoRequisitoService } from 'src/app/services/auditoria/classificacao-requisito.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-auditoria-requisito-parametro',
  templateUrl: './auditoria-requisito-parametro.component.html',
  styleUrls: ['./auditoria-requisito-parametro.component.sass']
})
export class AuditoriaRequisitoParametroComponent implements OnInit {

  auditoriaNivelItRequisito: AuditoriaNivelItRequisito;
  listClassificacaoRequisito: ClassificacaoRequisito;
  filterForm: FormGroup;

  public onClose: Subject<AuditoriaNivelItRequisito>;
  loading = false;

  constructor(private dialogBox: DialogBoxService, public modalRef: BsModalRef,
              private auditoriaNivelItRequisitoService: AuditoriaNivelItRequisitoService,
              private classificacaoRequisitoService: ClassificacaoRequisitoService) { }

  ngOnInit() {
    this.getClassificacaoRequisito();
    console.log(JSON.stringify(this.filterForm));
    this.onClose = new Subject();
  }

  public closeModal(): void {
    this.onClose.next(this.auditoriaNivelItRequisito);
    this.modalRef.hide();
  }

  getClassificacaoRequisito() {
    this.classificacaoRequisitoService.list().subscribe(data => {
      this.listClassificacaoRequisito = data;
    });
  }

  salvar() {
     if (!this.auditoriaNivelItRequisito.ds_orientacao && !this.auditoriaNivelItRequisito.classificacao_requisito_id && !this.auditoriaNivelItRequisito.nr_peso && !this.auditoriaNivelItRequisito.ie_evidencia) {
       return this.dialogBox.show('Nenhum campo foi alterado!', 'Warning');
     }
     this.loading = true;
     this.auditoriaNivelItRequisitoService.edit(this.auditoriaNivelItRequisito).subscribe(data => {
       this.loading = false;
       this.closeModal();
     }, () => this.loading = false);
   }
}
