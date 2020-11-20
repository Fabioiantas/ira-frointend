import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditoriaEntidade } from 'src/app/models/auditoriaEntidade';
import { AuditoriaNivelService } from 'src/app/services/auditoria-nivel.service';
import { AuditoriaDataService } from 'src/app/services/auditoria/auditoria-data.service';
import { AuditoriaEntidadeService } from 'src/app/services/auditoria/auditoria-entidade.service';
import { EntidadeService } from 'src/app/services/entidade.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-auditoria-entidade-cadastro',
  templateUrl: './auditoria-entidade-cadastro.component.html',
  styleUrls: ['./auditoria-entidade-cadastro.component.sass']
})
export class AuditoriaEntidadeCadastroComponent implements OnInit {
  auditoriaEntidade = new AuditoriaEntidade();
  listEntidade: any;
  listPropriedade: any;
  listAuditoriaNivel: any;
  params: any;
  loadPropriedade = false;
  loadEntidade = false;

  formGroup = new FormGroup({
    id: new FormControl(''),
    entidade_id: new FormControl('', Validators.required),
    propriedade_id: new FormControl('', Validators.required),
    auditoria_nivel_id: new FormControl('', Validators.required),
    dt_auditoria: new FormControl(null, Validators.required),
    dt_validade: new FormControl(null, Validators.required)
  });

  constructor(private auditoriaEntidadeService: AuditoriaEntidadeService,
              private entidadeService: EntidadeService,
              private propriedadeService: PropriedadeService,
              private auditoriaNivelService: AuditoriaNivelService,
              private auditoriaDataService: AuditoriaDataService,
              private dialogBox: DialogBoxService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getEntidade();
    this.getAuditoriaNivel();
    this.route.params.subscribe(data => {
      this.params = data;
      if (this.params.id) {
        this.getAuditoriaEntidade(this.params.id);
      } else {
        this.auditoriaDataService.curFilterAuditoriaEntidade.subscribe(dados => {
          if (dados) {
            this.auditoriaEntidade.entidade_id = dados.value.entidade.id,
            this.auditoriaEntidade.propriedade_id = dados.value.propriedade.propriedade_id;
          }
          this.getPropriedade(this.auditoriaEntidade.entidade_id);
          this.formGroup.patchValue({
            entidade_id: this.auditoriaEntidade.entidade_id,
            propriedade_id: this.auditoriaEntidade.propriedade_id
          });
        });
      }
    });
  }

  getAuditoriaEntidade(id: any) {
    this.auditoriaEntidadeService.getById(id).subscribe(data => {
      this.formGroup.patchValue({
        id: data.id,
        entidada_id: data.entidade_id,
        propriedade_id: data.propriedade_id,
        auditoria_nivel_id: data.auditoria_nivel_id,
        dt_auditoria: new Date(data.dt_auditoria),
        dt_validade: new Date(data.dt_validade)
      });
      this.auditoriaEntidade = data;
      this.changeEntidade();
    });
  }

  getEntidade() {
    this.loadEntidade = true;
    this.entidadeService.listar().subscribe(data => {
      this.listEntidade = data;
      this.loadEntidade = false;
    });
  }

  changeEntidade() {
    this.loadPropriedade  = true;
    this.formGroup.get('propriedade_id').setValue(null);
    this.auditoriaEntidade.propriedade_id = null;
    this.formGroup.patchValue({
      entidade_id: this.auditoriaEntidade.entidade_id
    });
    this.getPropriedade(this.auditoriaEntidade.entidade_id);
  }

  getPropriedade(entidadeId: any) {
    this.loadPropriedade = true;
    this.propriedadeService.byEntidade(entidadeId).subscribe((data: any) => {
      this.listPropriedade = data;
      this.loadPropriedade = false;
    });
  }

  changePropriedade() {
    this.formGroup.patchValue({
      propriedade_id: this.auditoriaEntidade.propriedade_id
    });
  }

  changeAuditoriaNivel() {
    this.formGroup.patchValue({
      auditoria_nivel_id: this.auditoriaEntidade.auditoria_nivel_id
    });
    console.log('a ' + JSON.stringify(this.formGroup.value));
  }

  getAuditoriaNivel() {
    this.auditoriaNivelService.list().subscribe(data => {
      this.listAuditoriaNivel = data;
    });
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    console.log(this.formGroup.value.id);

    this.auditoriaEntidadeService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Entidade auditada salva com sucesso, deseja continuar cadastrando?', 'CONFIRM').then(sim => {
        if (sim) {
          this.formGroup.reset();
          this.auditoriaEntidade = new AuditoriaEntidade();
        } else {
          this.router.navigate(['/auditoriaentidade']);
        }
      });
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/auditoriaentidade']);
  }

}
