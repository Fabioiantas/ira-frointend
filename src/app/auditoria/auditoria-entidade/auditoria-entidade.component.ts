import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditoriaEntidade } from 'src/app/models/auditoriaEntidade';
import { AuditoriaEntidadeService } from 'src/app/services/auditoria/auditoria-entidade.service';
import { EntidadeService } from 'src/app/services/entidade.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';

@Component({
  selector: 'app-auditoria-entidade',
  templateUrl: './auditoria-entidade.component.html',
  styleUrls: ['./auditoria-entidade.component.sass']
})
export class AuditoriaEntidadeComponent implements OnInit {

  filterForm: FormGroup;
  auditoriaEntidade: AuditoriaEntidade;

  listEntidade: any;
  listPropriedade: any;
  rowsAuditoriaEntidade: any;
  selected: any = [];

  columnsAuditoriaEntidade = [
    {name : 'Auditoria', prop : 'nm_nivel', width : '35%', selecionado: true},
    {name : 'Validade', prop : 'dt_validade', width : '20%', selecionado: false}
  ];

  constructor(private formBuilder: FormBuilder,
              private auditoriaEntidadeService: AuditoriaEntidadeService,
              private entidadeService: EntidadeService,
              private propriedadeService: PropriedadeService) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      entidade: [null],
      propriedade: [null, Validators.required]
    });
    this.getListEntidade();
  }

  getListEntidade() {
    this.entidadeService.listar().subscribe(data => {
      this.listEntidade = data;
    });
  }

  changeEntidade() {
    this.filterForm.get('propriedade').setValue(null);
    this.propriedadeService.byEntidade(this.filterForm.value.entidade.id).subscribe(data => {
      this.listPropriedade = data;
    });
  }

  changePropriedade() {
    this.auditoriaEntidadeService.getByEntidadePropriedade(this.filterForm.value).subscribe(data => {
      this.rowsAuditoriaEntidade = data;
    });
  }
}
