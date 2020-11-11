import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuditoriaItem } from 'src/app/models/auditoriaItem';
import { AuditoriaNivel } from 'src/app/models/auditoriaNivel';
import { AuditoriaNivelItem } from 'src/app/models/auditoriaNivelItem';
import { AuditoriaNivelItRequisito } from 'src/app/models/auditoriaNivelItRequisito';
import { AuditoriaRequisito } from 'src/app/models/auditoriaRequisito';
import { TipoAtividade } from 'src/app/models/tipoatividade';
import { AuditoriaNivelService } from 'src/app/services/auditoria-nivel.service';
import { AuditoriaItemService } from 'src/app/services/auditoria/auditoria-item.service';
import { AuditoriaNivelItRequisitoService } from 'src/app/services/auditoria/auditoria-nivel-it-requisito.service';
import { AuditoriaNivelItemServiceService } from 'src/app/services/auditoria/auditoria-nivel-item-service.service';
import { AuditoriaRequisitoService } from 'src/app/services/auditoria/auditoria-requisito.service';
import { DataService } from 'src/app/services/data.service';
import { TipoAtividadeService } from 'src/app/services/tipo-atividade.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { AuditoriaRequisitoParametroComponent } from '../auditoria-requisito-parametro/auditoria-requisito-parametro.component';

@Component({
  selector: 'app-auditoria-nivel-it-requisito',
  templateUrl: './auditoria-nivel-it-requisito.component.html',
  styleUrls: ['./auditoria-nivel-it-requisito.component.sass']
})
export class AuditoriaNivelItRequisitoComponent implements OnInit {

  listTipoAtividade: TipoAtividade;
  auditoriaNivelItem: any[];
  listAuditoriaNivelItem: any[];
  auditoriaNivelItemCadastro: AuditoriaNivelItem;
  auditoriaNivelItRequisito: any[];
  listAuditoriaItem: AuditoriaItem[];
  auditoriaItem: AuditoriaItem = new AuditoriaItem();
  listNivel: AuditoriaNivel;
  filterForm: FormGroup;
  auditoriaRequisito = new AuditoriaRequisito();
  listAuditoriaRequisito: any[];
  isInsertRequisito = false;

  public onClose: Subject<FormGroup>;

  columnsNivelItem = [
    {name : 'Item', prop : 'ds_item', width : '20%', selecionado: true}
  ];

  formGroup = new FormGroup({
    id: new FormControl(''),
    auditoria_item_id: new FormControl('', Validators.required),
    ds_requisito: new FormControl('', Validators.required)
  });

  constructor(private tipoAtividadeService: TipoAtividadeService,
              private auditoriaNivelService: AuditoriaNivelService,
              private auditoriaItemSerice: AuditoriaItemService,
              private auditoriaNivelItemService: AuditoriaNivelItemServiceService,
              private auditoriaNivelItRequisitoService: AuditoriaNivelItRequisitoService,
              private auditoriaRequisitoService: AuditoriaRequisitoService,
              private dataService: DataService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private dialogBox: DialogBoxService,
              private toastrService: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      tipoAtividade: [null],
      auditoriaNivel: [null, Validators.required],
      auditoriaNivelItem: [null, Validators.required]
    });

    this.getAtividade();
    this.getNiveis();
    this.dataService.curAuditoriaNivelItem.subscribe(data => {
      console.log('data ' + JSON.stringify(data));
    });
  }

  getAtividade() {
    this.tipoAtividadeService.listar().subscribe(data => {
      this.listTipoAtividade = data;
    });
  }

  getNiveis() {
    this.auditoriaNivelService.list().subscribe(data => {
      this.listNivel = data;
    });
  }
  getItens() {
    this.auditoriaItemSerice.list().subscribe(data => {
      this.listAuditoriaItem = data;
    });
  }

  addItem() {
    if (this.filterForm.valid) {
      this.auditoriaNivelItemCadastro = new AuditoriaNivelItem();
      this.auditoriaNivelItemCadastro.auditoria_nivel_id = this.filterForm.value.auditoriaNivel.id;
      this.auditoriaNivelItemCadastro.auditoria_item_id = this.filterForm.value.auditoriaItem.id;
      this.auditoriaNivelItemService.add(this.auditoriaNivelItemCadastro).subscribe(() => {
        this.showSuccess('Item adicionado com sucesso!', 'Mensagem');
        this.changeNivel();
      });
    }
  }

  removeItem(id: any) {
    this.dialogBox.show('Confirma exclusão do Item e todos seus Requisitos?', 'CONFIRM').then((sim: any) => {
      if (sim) {
        this.auditoriaNivelItemService.remove(id).subscribe(() => {
          this.showSuccess('Item removido com sucesso!', 'Mensagem');
          this.changeNivel();
        });
      }
    });
  }

  changeTipoAtividade() {
    this.filterForm.get('auditoriaNivel').setValue(null);
    this.filterForm.get('auditoriaNivelItem').setValue(null);
    if (this.filterForm.value.tipoAtividade.id) {
      this.auditoriaNivelService.getByTipoAtividadeId(this.filterForm.value.tipoAtividade.id).subscribe(data => {
        this.listNivel = data;
      });
    } else {
      this.auditoriaNivelService.list().subscribe(data => {
        this.listNivel = data;
      });
    }
  }

  changeNivel() {
    this.auditoriaNivelItemService.getByNivel(this.filterForm.value.auditoriaNivel.id).subscribe(data => {
      this.listAuditoriaNivelItem = data.map(row => ({
        id: row.id,
        auditoria_nivel_id: row.auditoria_nivel_id,
        auditoria_item: row.auditoria_item,
        ds_item: row.auditoria_item.ds_item
      }));
    });
  }

  getRequisitos() {
    this.auditoriaRequisitoService.list().subscribe(data => {
      this.listAuditoriaRequisito = data;
    });
  }

  changeNivelItem() {
    this.auditoriaNivelItRequisitoService.getRequisitosByNivelId(this.filterForm.value.auditoriaNivelItem.id).subscribe(data => {
      this.auditoriaNivelItRequisito = data.map(row => ({
        id: row.id,
        auditoria_nivel_item_id: row.auditoria_nivel_item_id,
        auditoria_requisito_id: row.auditoria_requisito_id,
        ds_requisito: row.auditoria_requisito.ds_requisito,
        classificacao_requisito_id: row.classificacao_requisito_id,
        ds_orientacao: row.ds_orientacao,
        nr_peso: row.nr_peso,
        ie_evidencia: row.ie_evidencia
      }));
    });
  }

  showSuccess(message: string, title: string) {
    this.toastrService.success(message, title, {
      timeOut: 3000,
    });
  }

  editRequisito(requisito: any) {
    const initialState = {
      auditoriaNivelItRequisito: requisito,
      filterForm: this.filterForm.value
    };
    this.modalService.show(AuditoriaRequisitoParametroComponent, { initialState, backdrop: 'static', class: 'modal-lg'})
    .content.onClose.subscribe(itemReturn => {
      requisito = itemReturn;
      this.changeNivelItem();
    });
  }

  remove(id: any) {
    this.dialogBox.show('Confirma remoção do Requisito?', 'CONFIRM').then((sim) => {
      if (sim) {
        this.auditoriaNivelItRequisitoService.remove(id).subscribe(() => {
          this.showSuccess('Requisito removido com sucesso', 'Mensagem');
          this.changeNivelItem();
        });
      }
    });
  }

  inserirRequisito() {
    this.isInsertRequisito = true;
    this.getRequisitos();
  }

  salvarRequisito() {
    this.isInsertRequisito = false;
    this.listAuditoriaRequisito = [];
    const nivelItRequisito = new AuditoriaNivelItRequisito();
    nivelItRequisito.auditoria_nivel_item_id = this.filterForm.value.auditoriaNivelItem.id;
    nivelItRequisito.auditoria_requisito_id = this.auditoriaRequisito.id;
    this.auditoriaNivelItRequisitoService.add(nivelItRequisito).subscribe(data => {
      this.showSuccess('Requisito inserido com sucesso!', 'Mensagem');
      this.changeNivelItem();
    });
  }

  cancelarRequisto() {
    this.isInsertRequisito = false;
    this.listAuditoriaRequisito = [];
  }

  filtrar() {
    if (this.filterForm.valid) {
      this.changeNivelItem();
    }
  }

  cleanFilter() {
    this.filterForm.reset();
    this.auditoriaNivelItRequisito = [];
  }
}
