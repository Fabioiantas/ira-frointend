import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditoriaNivel } from 'src/app/models/auditoriaNivel';
import { AuditoriaNivelItem } from 'src/app/models/auditoriaNivelItem';
import { TipoAtividade } from 'src/app/models/tipoatividade';
import { AuditoriaNivelService } from 'src/app/services/auditoria-nivel.service';
import { AuditoriaNivelItemServiceService } from 'src/app/services/auditoria/auditoria-nivel-item-service.service';
import { TipoAtividadeService } from 'src/app/services/tipo-atividade.service';

@Component({
  selector: 'app-auditoria-nivel-item',
  templateUrl: './auditoria-nivel-item.component.html',
  styleUrls: ['./auditoria-nivel-item.component.sass']
})
export class AuditoriaNivelItemComponent implements OnInit {

  listTipoAtividade: TipoAtividade;
  auditoriaNivelItem: any[];
  listNivel: AuditoriaNivel;
  filterForm: FormGroup;

  columnsNivelItem = [
    {name : 'Item', prop : 'ds_item', width : '20%', selecionado: true}
  ];

  constructor(private tipoAtividadeService: TipoAtividadeService,
             private auditoriaNivelService: AuditoriaNivelService,
             private auditoriaNivelItemService: AuditoriaNivelItemServiceService,
             private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      tipoAtividade: [null],
      auditoriaNivel: [null, Validators.required]
    });

    this.getAtividade();
  }

  getAtividade() {
    this.tipoAtividadeService.listar().subscribe(data => {
      this.listTipoAtividade = data;
    });
  }

  changeTipoAtividade() {
    this.filterForm.get('auditoriaNivel').setValue(null);
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
      this.auditoriaNivelItem = data.map(row => ({
        id: row.id,
        auditoria_nivel_id: row.auditoria_nivel_id,
        auditoria_item: row.auditoria_item,
        ds_item: row.auditoria_item.ds_item
      }));
    });
  }

}
