import { AuditarRequisitoComponent } from './../auditar-requisito/auditar-requisito.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit  } from '@angular/core';
import { AuditoriaEntidadeService } from 'src/app/services/auditoria/auditoria-entidade.service';
import { AuditoriaEntidadeItRequisito } from 'src/app/models/auditoriaEntidadeItRequisito';
import { ActivatedRoute } from '@angular/router';

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
  lastItem: any;
  params: any;

  max = 200;
  showWarning: boolean;
  dynamic: number;
  type: string;

  constructor(private auditoriaEntidadeService: AuditoriaEntidadeService,
              private modalService: BsModalService,
              public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
      this.getAuditoriaEntidadeItRequisito(this.params.id);
    });
  }

  getAuditoriaEntidadeItRequisito(id) {
    this.auditoriaEntidadeService.getAuditoriaEntidadeItReqById(id).subscribe(data => {
      this.auditoriaEntidadeItRequisito = data;
        data.auditoria_entidade_items.forEach(function (value) {
        if (value) {
          console.log(JSON.stringify(value.auditoria_entidade_it_requisitos));
        }
      });
    });
  }

  onClick(index: number) {
    this.active = index;
    // this.editarRequisito(requisito, item, auditoria);
  }

  editarRequisito(requisito: AuditoriaEntidadeItRequisito, item: any, auditoria: any) {
    const initialState = {
      auditoriaEntidadeItRequisito: requisito,
      item,
      auditoria,
      j: this.active
    };
    this.modalService.show(AuditarRequisitoComponent, { initialState, backdrop: 'static', class: 'modal-lg'})
    .content.onClose.subscribe((requisiroReturn: AuditoriaEntidadeItRequisito) => {
      requisito = requisiroReturn;
      this.getAuditoriaEntidadeItRequisito(this.params.id);
    });
  }

  setLastItem(id: any) {
    this.lastItem = id;
    console.log('id ' + this.lastItem);
  }
}
