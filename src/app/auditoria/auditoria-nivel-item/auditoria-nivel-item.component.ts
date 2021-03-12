import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuditoriaItem } from 'src/app/models/auditoriaItem';
import { AuditoriaNivel } from 'src/app/models/auditoriaNivel';
import { AuditoriaNivelItem } from 'src/app/models/auditoriaNivelItem';
import { TipoAtividade } from 'src/app/models/tipoatividade';
import { AuditoriaNivelService } from 'src/app/services/auditoria-nivel.service';
import { AuditoriaItemService } from 'src/app/services/auditoria/auditoria-item.service';
import { AuditoriaNivelItemServiceService } from 'src/app/services/auditoria/auditoria-nivel-item-service.service';
import { TipoAtividadeService } from 'src/app/services/tipo-atividade.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-auditoria-nivel-item',
  templateUrl: './auditoria-nivel-item.component.html',
  styleUrls: ['./auditoria-nivel-item.component.sass']
})
export class AuditoriaNivelItemComponent implements OnInit {

  listTipoAtividade: TipoAtividade;
  auditoriaNivelItem: any[];
  listAuditoriaNivelItem: any[];
  auditoriaNivelItemCadastro: AuditoriaNivelItem;
  listAuditoriaItem: AuditoriaItem[];
  auditoriaItem: AuditoriaItem = new AuditoriaItem();
  listNivel: AuditoriaNivel;
  filterForm: FormGroup;
  loading = false;
  loadingC = false;
  toggleMobileSidebar: any;
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
              private dataService: DataService,
              private formBuilder: FormBuilder,
              private router: Router,
              private dialogBox: DialogBoxService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      tipoAtividade: [null],
      auditoriaNivel: [null, Validators.required],
      auditoriaItem: [null, Validators.required],
      auditoriaNivelItem: [null]
    });
    this.getAtividade();
    this.getNiveis();
  }

  getAtividade() {
    this.tipoAtividadeService.listar().subscribe(data => {
      this.listTipoAtividade = data;
    });
  }

  getItens() {
    this.loading = true;
    this.auditoriaItemSerice.list().subscribe(data => {
      this.listAuditoriaItem = data;
      this.loading = false;
    });
  }

  getNiveis() {
    this.auditoriaNivelService.list().subscribe(data => {
      this.listNivel = data;
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
    this.dialogBox.show('Confirma exclusão do Item e todos seus Requisitos?', 'CONFIRM').then(sim => {
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
    if (this.filterForm.value.tipoAtividade.id) {
      this.auditoriaNivelService.getByTipoAtividadeId(this.filterForm.value.tipoAtividade.id).subscribe(data => {
        this.listNivel = data;
      });
    } else {
      this.getNiveis();
    }
  }

  changeNivel() {
    this.auditoriaNivelItemService.getByNivel(this.filterForm.value.auditoriaNivel.id).subscribe(data => {
      this.auditoriaNivelItem = data.map(row => ({
        id: row.id,
        auditoria_nivel_id: row.auditoria_nivel_id,
        auditoria_item: row.auditoria_item,
        ds_item: row.auditoria_item.ds_item
      }));
      this.getItens();
    });
  }

  changeItem() {
    this.filterForm.patchValue({
      auditoriaItem: this.auditoriaItem
    });
  }

  showSuccess(message: string, title: string) {
    this.toastrService.success(message, title, {
      timeOut: 3000,
    });
  }

  showRequisitos(nivelItem: any) {
    this.filterForm.patchValue({
      auditoriaNivelItem: nivelItem
    });
    this.dataService.changeFilterAuditoriaNivelItem(this.filterForm);
    this.router.navigate([`/nivelitrequisito`]);
  }

  cleanFilter(){}

}
