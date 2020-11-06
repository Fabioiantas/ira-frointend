import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditoriaNivel } from 'src/app/models/auditoriaNivel';
import { TipoAtividade } from 'src/app/models/tipoatividade';
import { AuditoriaNivelService } from 'src/app/services/auditoria-nivel.service';
import { TipoAtividadeService } from 'src/app/services/tipo-atividade.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-auditoria-nivel-cadastro',
  templateUrl: './auditoria-nivel-cadastro.component.html',
  styleUrls: ['./auditoria-nivel-cadastro.component.sass']
})
export class AuditoriaNivelCadastroComponent implements OnInit {

  formGroup = new FormGroup({
    id: new FormControl(''),
    tipo_atividade_id: new FormControl('', Validators.required),
    nm_nivel: new FormControl('', Validators.required),
    ds_nivel: new FormControl('', Validators.required),
    ie_situacao: new FormControl('', Validators.required)
  });

  auditoriaNivel: AuditoriaNivel = new AuditoriaNivel();
  tipoAtividade: TipoAtividade = new TipoAtividade();
  listAtividade: any;
  params: any;
  isLoading: any = false;

  id: any;
  nmParametro: any;
  dsParametro: any;

  constructor(private auditoriaNivelService: AuditoriaNivelService,
              private tipoAtividadeService: TipoAtividadeService,
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.formGroup.reset();
    this.getTipoAtividade();
    this.route.params.subscribe(data => {
      this.params = data;
    });
    if (this.params.id) {
      this.auditoriaNivelService.getById(this.params.id).subscribe(auditoriaNivel => {
        this.auditoriaNivel = auditoriaNivel;
        this.tipoAtividade.id = this.auditoriaNivel.tipo_atividade_id;
        this.formGroup.patchValue({
          id: auditoriaNivel.id,
          tipo_atividade_id: auditoriaNivel.tipo_atividade_id,
          nm_nivel: auditoriaNivel.nm_nivel,
          ds_nivel: auditoriaNivel.ds_nivel,
          ie_situacao: auditoriaNivel.ie_situacao
        });
      });
    }
  }

  getTipoAtividade() {
    this.tipoAtividadeService.listar().subscribe((data: any) => {
      this.listAtividade = data;
    });
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    console.log(this.formGroup.value.id);

    this.auditoriaNivelService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Nível salvo com sucesso!', 'OK');
      this.router.navigate(['/auditorianivel']);
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/auditorianivel']);
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

  changeTipoAtividade() {
    this.formGroup.patchValue({
      tipo_atividade_id: this.tipoAtividade.id
    });
  }

}
