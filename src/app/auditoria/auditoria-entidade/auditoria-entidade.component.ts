import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuditoriaEntidade } from 'src/app/models/auditoriaEntidade';
import { AuditoriaNivelService } from 'src/app/services/auditoria-nivel.service';
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
  listNivel: any;
  rowsAuditoriaEntidade: any;
  selected: any = [];

  columnsAuditoriaEntidade = [
    {name : 'Auditoria', prop : 'nm_nivel', width : '35%', selecionado: true},
    {name : 'Validade', prop : 'dt_validade', width : '20%', selecionado: false}
  ];

  constructor(private formBuilder: FormBuilder,
              private auditoriaEntidadeService: AuditoriaEntidadeService,
              private entidadeService: EntidadeService,
              private propriedadeService: PropriedadeService,
              private nivelService: AuditoriaNivelService,
              private router: Router) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      entidade: [null],
      propriedade: [null, Validators.required],
      nivel: [null, Validators.required]
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
    const propriedadeId = this.filterForm.value.propriedade.propriedade_id;
    this.auditoriaEntidadeService.getByEntidadePropriedade(propriedadeId).subscribe(data => {
      this.rowsAuditoriaEntidade = data.map(row => ({
        id: row.id,
        nr_auditoria: row.nr_auditoria,
        entidade_id: row.entidade_id,
        propriedade_id: row.propriedade_id,
        auditoria_nivel_id: row.auditoria_nivel_id,
        nm_nivel: row.auditoria_nivel.nm_nivel,
        dt_auditoria: row.dt_auditoria,
        dt_validade: row.dt_validade
      }));
    });
  }

  getNivel() {
    this.nivelService.list().subscribe(data => {
      this.listNivel = data;
    });
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/auditoriaentidade/adicionar/' + $event.row.id]);
    }
  }
}
