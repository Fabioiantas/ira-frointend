import { AuditarRequisitoComponent } from './../auditar-requisito/auditar-requisito.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild  } from '@angular/core';
import {ThemeOptions} from '../../theme-options';
import { NgbPanelChangeEvent, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { AuditoriaEntidadeService } from 'src/app/services/auditoria/auditoria-entidade.service';
import { AuditoriaEntidadeItRequisito } from 'src/app/models/auditoriaEntidadeItRequisito';

@Component({
  selector: 'app-auditar',
  templateUrl: './auditar.component.html',
  styleUrls: ['./auditar.component.sass']
})
export class AuditarComponent implements OnInit {
  nivelItRequisitos: any;
  auditoriaEntidadeItRequisito: any[] = [];
  active: number;
  requisito: any;

  constructor(private auditoriaEntidadeService: AuditoriaEntidadeService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getAuditoriaEntidadeItRequisito();
  }

  getAuditoriaEntidadeItRequisito() {
    this.auditoriaEntidadeService.getAuditoriaEntidadeItReqById(1).subscribe(data => {
      this.auditoriaEntidadeItRequisito = data.auditoria_entidade_items;
      console.log(JSON.stringify(this.auditoriaEntidadeItRequisito[0].auditoria_entidade_it_requisitos));
    });
  }

  onClick(index: number, requisito: any) {
    this.active = index;
    this.editarRequisito(requisito);
  }

  editarRequisito(requisito: AuditoriaEntidadeItRequisito) {
    const initialState = {
      auditoriaEntidadeItRequisito: requisito
    };
    this.modalService.show(AuditarRequisitoComponent, { initialState, backdrop: 'static', class: 'modal-lg'})
    .content.onClose.subscribe((requisiroReturn: AuditoriaEntidadeItRequisito) => {
      requisito = requisiroReturn;
      // this.findMonitoramento();
    });
  }
}
