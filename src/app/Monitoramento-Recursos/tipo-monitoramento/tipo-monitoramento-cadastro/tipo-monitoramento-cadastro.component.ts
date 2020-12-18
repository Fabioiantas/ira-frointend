import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoServiceService } from 'src/app/services/recurso-service.service';
import { TipoMonitoramentoService } from 'src/app/services/tipo-monitoramento.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-tipo-monitoramento-cadastro',
  templateUrl: './tipo-monitoramento-cadastro.component.html',
  styleUrls: ['./tipo-monitoramento-cadastro.component.sass']
})
export class TipoMonitoramentoCadastroComponent implements OnInit {

  listRecurso: any;

  formGroup = new FormGroup({
    id: new FormControl(''),
    nr_monitoramento: new FormControl(''),
    recurso_id: new FormControl('', Validators.required),
    nm_monitoramento: new FormControl('', Validators.required),
    ds_monitoramento: new FormControl(''),
    ie_situacao: new FormControl('', Validators.required),
  });

  constructor(private recursoService: RecursoServiceService,
              private tipoMonitoramentoService: TipoMonitoramentoService,
              private dialogBox: DialogBoxService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRecursos();
    this.route.params.subscribe(params => {
      if (params.id) {
        this.tipoMonitoramentoService.getTipoMonitoramentoById(params.id).subscribe(data => {
          this.formGroup.patchValue({
            id: data.id,
            recurso_id: data.recurso_id,
            nr_monitoramento: data.nr_monitoramento,
            nm_monitoramento: data.nm_monitoramento,
            ds_monitoramento: data.ds_monitoramento,
            ie_situacao: data.ie_situacao
          });
        });
      }
    });
  }

  getRecursos() {
    this.recursoService.list().subscribe(data => {
      this.listRecurso = data;
    });
  }

  salvar() {
    this.tipoMonitoramentoService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Monitoramento salvo com sucesso!', 'OK');
      this.router.navigate(['/tipomonitoramento']);
    });
  }

  cancelar() {
    this.formGroup.reset();
    this.router.navigate(['/tipomonitoramento']);
  }
}
