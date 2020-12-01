import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuditoriaEntidade } from 'src/app/models/auditoriaEntidade';
import { AuditoriaNivelService } from 'src/app/services/auditoria-nivel.service';
import { AuditoriaDataService } from 'src/app/services/auditoria/auditoria-data.service';
import { AuditoriaEntidadeService } from 'src/app/services/auditoria/auditoria-entidade.service';
import { EntidadeService } from 'src/app/services/entidade.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

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
  loading = false;
  loadPropriedade = false;

  columnsAuditoriaEntidade = [
    {name : 'Número', prop : 'nr_auditoria', width : '35%', selecionado: true},
    {name : 'Auditoria', prop : 'nm_nivel', width : '35%', selecionado: true},
    {name : 'Data Prevista', prop : 'dt_auditoria', width : '35%', selecionado: true},
    {name : 'Validade', prop : 'dt_validade', width : '20%', selecionado: false}
  ];

  constructor(private formBuilder: FormBuilder,
              private auditoriaEntidadeService: AuditoriaEntidadeService,
              private entidadeService: EntidadeService,
              private propriedadeService: PropriedadeService,
              private nivelService: AuditoriaNivelService,
              private auditoriaDataService: AuditoriaDataService,
              private dialogBox: DialogBoxService,
              private router: Router) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      entidade: [null, Validators.required],
      propriedade: [null, Validators.required]
    });
    this.getListEntidade();
  }

  getListEntidade() {
    this.auditoriaEntidadeService.getEntidadesAuditadas().subscribe(data => {
      this.listEntidade = data;
    });
  }

  changeEntidade() {
    this.rowsAuditoriaEntidade = [];
    this.listPropriedade = [];
    this.filterForm.get('propriedade').setValue(null);
    if (!this.filterForm.value.entidade.id) { return; }
    this.loadPropriedade = true;
    this.propriedadeService.byEntidade(this.filterForm.value.entidade.id).subscribe(data => {
      this.listPropriedade = data;
      this.loadPropriedade = false;
    });
  }

  changePropriedade() {
    if (!this.filterForm.valid) { return; }
    const propriedadeId = this.filterForm.value.propriedade.propriedade_id;
    this.auditoriaDataService.changeAuditoriaEntidade(this.filterForm);
    this.loading = true;
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
      this.loading = false;
    });
  }

  getNivel() {
    this.nivelService.list().subscribe(data => {
      this.listNivel = data;
    });
  }

  editar(id: any) {
      this.router.navigate(['/auditoriaentidade/adicionar/' + id]);
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show('Confirma remoção da Entidade auditada?', 'CONFIRM').then(sim => {
        if (sim) {
          this.auditoriaEntidadeService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Entidade removida com sucesso!', 'OK');
            this.changePropriedade();
          });
        }
      });
    }
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/auditoriaentidade/adicionar/' + $event.row.id]);
    }
  }

  cleanFilter() {
    this.filterForm.reset();
    this.filterForm.get('propriedade_id').setValue(null);
    this.rowsAuditoriaEntidade = [];
  }

  auditar() {
    if(this.selected[0]) {
      this.router.navigate([`/auditar/${this.selected[0].id}`]);
    }
  }
}
