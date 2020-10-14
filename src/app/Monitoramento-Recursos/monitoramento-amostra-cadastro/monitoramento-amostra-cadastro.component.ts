import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { FormBuilder } from '@angular/forms';
import { FilterMonitoramentoRecurso } from 'src/app/models/filter-monitoramento-recurso';
import { DataService } from 'src/app/services/data.service';
import { MonitoramentoRecursoService } from 'src/app/services/monitoramento-recurso.service';
import { MonitoramentoRecursoAmostra } from 'src/app/models/monitoramentoRecursoAmostra';
import { ParametroService } from 'src/app/services/parametro.service';
import { MonitoramentoLaudo } from 'src/app/models/monitoramentoLaudo';
import { ResultadoAmostra } from 'src/app/models/resultadoAmostra';
import { TipoMonitoramento } from 'src/app/models/tipoMonitoramento';
import { TipoMonitoramentoService } from 'src/app/services/tipo-monitoramento.service';

@Component({
  selector: 'app-monitoramento-amostra-cadastro',
  templateUrl: './monitoramento-amostra-cadastro.component.html',
  styleUrls: ['./monitoramento-amostra-cadastro.component.sass']
})
export class MonitoramentoAmostraCadastroComponent implements OnInit {
  fonte: any;
  params: any;
  isAddEdit = false;
  isAddEditParam = false;
  isAddEditResult = false;
  loading: boolean;
  // amostras: MonitoramentoRecursoAmostra;
  tipoMonitoramento: TipoMonitoramento;
  amostras: MonitoramentoRecursoAmostra;
  amostraLaudo: MonitoramentoRecursoAmostra;
  laudoAmostra: any;
  resultadoAmostra: ResultadoAmostra;
  resultadoPost: any[] = [];
  laudo: MonitoramentoLaudo;
  parametrosList: any[];
  filterM: FilterMonitoramentoRecurso;
  editField: string;
  nrAmostra: string;
  dsAmostra: string;
  nrResultadoOld: string;

  constructor(private tipoMonitoramentoService: TipoMonitoramentoService,
              private monitoramentoService: MonitoramentoRecursoService,
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

    // this.data.currentFilter.subscribe(filter => {
    //   console.log(filter);
    // });

    this.data.currentLaudo.subscribe(laudo => {
      this.laudo = laudo;
      // console.log('laudo: ' + laudo);
    });
  }

  inserirAmostra() {
  this.isAddEdit = true;
}

editarItem(resultado: MonitoramentoRecursoAmostra) {
  this.amostraLaudo = new MonitoramentoRecursoAmostra();
  this.amostraLaudo = resultado;
  this.isAddEdit = true;
}

delete() {
  // this.monitoramentoService
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
    this.monitoramentoService.findAmostras(this.params.id).subscribe(amostras => {
      // console.log('amostras: ' + amostras.amostras);
      this.laudoAmostra = amostras;
      this.amostras = amostras.amostras;
    });
    this.tipoMonitoramentoService.getById(this.laudoAmostra.tipo_monitoramento_id).subscribe(data => {
      this.tipoMonitoramento = data;
    });
  }

  addAmostra() {
    if (!this.amostraLaudo.nr_amostra || !this.amostraLaudo.dt_amostra) {
      return this.dialogBox.show('É nescessário preencher o número e data da amostra', 'Warning');
    }
    this.loading = true;
    this.amostraLaudo.monitoramento_laudo_id = this.params.id;

    this.monitoramentoService[this.amostraLaudo.id ? 'editAmostraLaudo' : 'createAmostra'](this.amostraLaudo).subscribe(data => {
      this.loading = false;
      this.isAddEdit = false;
      this.amostraLaudo = new MonitoramentoRecursoAmostra();
      this.populaTable(this.params.id);
    }, () => this.loading = false);
  }

  removerAmostra(id: any) {
    this.dialogBox.show('Confirma remoção da Amostra e todos seus resultados?', 'CONFIRM').then(sim => {
      if (sim) {
        this.monitoramentoService.removeResultado(id).subscribe(data => {
          this.dialogBox.show('Amostra removida com sucesso!', 'OK');
          this.populaTable(this.params.id);
        });
      }
    });


  }

  getResultadoAmostra(amostra: any) {
    this.nrAmostra = amostra.nr_amostra;
    this.dsAmostra =  amostra.ds_amostra;
    this.monitoramentoService.getResultadoAmostra(amostra.id).subscribe(resultadoAmostra => {
      this.resultadoAmostra = resultadoAmostra;
      this.showParametros();
    });
  }

  showParametros() {
    this.isAddEditParam = true;
  }

  closeEdit() {
    this.isAddEditResult = false;
  }

  monitoramento() {
    this.router.navigate(['/monitoramento']);
  }

  showAmostras() {
    this.isAddEditParam = false;
  }

  editResultado() {
    this.isAddEditResult = true;
  }
// #####################
  changeValue(event: any) {
    this.editField = event.target.textContent;
  }

  updateResultado( item, event ) {
    console.log('item: ' + JSON.stringify(item));
    const index = this.resultadoPost.findIndex((e) => e.id === item.id);
    if (index === -1) {
      item.nr_resultado = event.target.textContent;
      console.log('item resultado: ' + item);
      this.resultadoPost.push(item);
    } else {
      this.resultadoPost[index].nr_resultado = event.target.textContent;
    }
    console.log(JSON.stringify(this.resultadoPost));
}

  // updateResultado(item: any, event: any) {
  //   // tslint:disable-next-line:whitespace
  //   if (this.resultadoPost.length === 0) {
  //     console.log('len: ' + this.resultadoPost.length);
  //     this.resultadoPost.push(item);
  //   } else {
  //     this.resultadoPost.forEach((value: any, i: any) => {
  //       this.resultadoPost.includes(item, i) ? this.resultadoPost[i] = item : this.resultadoPost.push(item);
  //       continue;
  //     });
  //   }
  //   console.log('json' + JSON.stringify(this.resultadoPost));
  // }

  oldResultado(event: any) {
    this.nrResultadoOld = event.target.textContent;
  }
}

