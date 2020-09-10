import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { MonitoramentoRecursoService } from 'src/app/services/monitoramento-recurso.service';
import { MonitoramentoRecursoAmostra } from 'src/app/models/monitoramentoRecursoAmostra';
import { ParametroService } from 'src/app/services/parametro.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FilterMonitoramentoRecurso } from 'src/app/models/filter-monitoramento-recurso';
import { DataService } from 'src/app/services/data.service';
import { MonitoramentoLaudo } from 'src/app/models/monitoramentoLaudo';

@Component({
  selector: 'app-monitoramento-amostra-cadastro',
  templateUrl: './monitoramento-amostra-cadastro.component.html',
  styleUrls: ['./monitoramento-amostra-cadastro.component.sass']
})
export class MonitoramentoAmostraCadastroComponent implements OnInit {
  fonte: any;
  params: any;
  isAddEdit = false;
  loading: boolean;
  amostras: MonitoramentoRecursoAmostra;
  amostraLaudo: MonitoramentoRecursoAmostra;
  laudo: MonitoramentoLaudo;
  parametrosList: any[];
  filterM: FilterMonitoramentoRecurso;

  constructor(private monitoramentoService: MonitoramentoRecursoService,
              private parametroService: ParametroService,
              private data: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private dialogBox: DialogBoxService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.populaParametros();
    this.amostraLaudo = new MonitoramentoRecursoAmostra();
    this.route.params.subscribe(param => {
      this.params = param;
    });

    if (this.params.id) {
      this.populaTable(this.params.id);
    }

    this.data.currentFilter.subscribe(filter => {
      console.log(filter);
    });

    this.data.currentLaudo.subscribe(laudo => {
      this.laudo = laudo;
    });
  }

inserirResultado() {
  this.isAddEdit = true;
}

editarItem(resultado: MonitoramentoRecursoAmostra) {
  this.amostraLaudo = new MonitoramentoRecursoAmostra();
  this.amostraLaudo = resultado;
  this.isAddEdit = true;
}

delete() {
  this.monitoramentoService
}

cancelar() {
  this.isAddEdit = false;
}

populaParametros() {
  this.parametroService.list().subscribe(param => {
    this.parametrosList = param;
  });
  }

  populaTable(id: any) {
    this.monitoramentoService.findAmostras(this.params.id).subscribe(monitoramento => {
      this.amostras = monitoramento;
    });
  }

  addAmostra() {
    if (!this.amostraLaudo.cd_unidade_padrao || !this.amostraLaudo.parametro_id ||
      !this.amostraLaudo.ds_operador || !this.amostraLaudo.nr_padrao_inicial) {
      return this.dialogBox.show('É nescessário preencher todos os campos', 'Warning');
    }
    this.loading = true;
    this.amostraLaudo.monitoramento_laudo_id = this.params.id;

    this.monitoramentoService[this.amostraLaudo.id ? 'editResutladoLaudo' : 'createAmostra'](this.amostraLaudo).subscribe(data => {
      this.loading = false;
      this.isAddEdit = false;
      this.amostraLaudo = new MonitoramentoRecursoAmostra();
      this.populaTable(this.params.id);
    }, () => this.loading = false);
  }

  removerResultado(id: any){
    this.dialogBox.show('Confirma remoção do Resultado?', 'CONFIRM').then(sim => {
      if (sim) {
        this.monitoramentoService.removeResultado(id).subscribe(data => {
          this.dialogBox.show('Resultado removido com sucesso!', 'OK');
          this.populaTable(this.params.id);
        });
      }
    });


  }

  monitoramento() {
    this.router.navigate(['/monitoramento']);
  }
}
