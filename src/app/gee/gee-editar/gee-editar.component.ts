import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entidade } from 'src/app/models/entidade';
import { EscopoGee } from 'src/app/models/escopoGee';
import { MonitoramentoGee } from 'src/app/models/monitoramentoGee';
import { Propriedade } from 'src/app/models/propriedade';
import { EntidadeService } from 'src/app/services/entidade.service';
import { EscopoGeeService } from 'src/app/services/escopo-gee.service';
import { MonitoramentoGeeService } from 'src/app/services/monitoramento-gee.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-gee-editar',
  templateUrl: './gee-editar.component.html',
  styleUrls: ['./gee-editar.component.sass']
})
export class GeeEditarComponent implements OnInit {
  escopos: EscopoGee;
  entidades: Entidade;
  propriedades: Propriedade;

  formGroup = new FormGroup({
    id: new FormControl(''),
    escopo_id: new FormControl(null, Validators.required),
    entidade_id: new FormControl(null, Validators.required),
    propriedade_id: new FormControl(null, Validators.required),
    nm_fonte_emissao: new FormControl(null),
    nm_combustivel: new FormControl(null)
  });

  monitoramento: MonitoramentoGee = new MonitoramentoGee();
  params: any;
  isLoading = false;

  id: any;
  nmRecurso: any;
  dsRecurso: any;

  registro: any;
  constructor(private monitoramentoService: MonitoramentoGeeService,
              private escopoService: EscopoGeeService,
              private entidadeService: EntidadeService,
              private propriedadeService: PropriedadeService,
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
    });

    this.escopoService.getList().subscribe((escopos: EscopoGee) => {
      this.escopos = escopos;
    });

    this.entidadeService.listaEntidades().subscribe((entidades: Entidade) => {
      this.entidades = entidades;
    });

    if (this.params.id) {
      this.isLoading = true;
      this.monitoramentoService.findById(this.params.id).subscribe(monitoramento => {
        this.monitoramento = monitoramento;
        this.formGroup.patchValue({
          id: monitoramento.id,
          escopo_id: monitoramento.escopo_id,
          entidade_id: monitoramento.entidade_id,
          nm_fonte_emissao: monitoramento.fonte_emissao.nm_fonte_emissao,
          nm_combustivel: monitoramento.tipo_combustivel ? monitoramento.tipo_combustivel.nm_combustivel : null
        });
        console.log(JSON.stringify(this.formGroup.value));
        this.changeEntidade();
        this.formGroup.get('propriedade_id').setValue(this.formGroup.value.entidade_id);
        this.isLoading = false;
      });
    }

  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    this.monitoramentoService.edit(this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Monitoramento salvo com sucesso!', 'OK');
      this.router.navigate(['/gee']);
    });
  }

  changeEntidade() {
    this.propriedadeService.byEntidade(this.formGroup.value.entidade_id).subscribe((data: Propriedade) => {
      this.propriedades = data;
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/monitoramento']);
  }

}
