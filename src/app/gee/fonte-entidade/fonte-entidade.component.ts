import { MonitoramentoGeeService } from './../../services/monitoramento-gee.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeeService } from 'src/app/services/gee.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { EntidadeService } from 'src/app/services/entidade.service';
import { Entidade } from 'src/app/models/entidade';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { GeeDataServiceService } from 'src/app/services/auditoria/gee/gee-data-service.service';
import { MonitoramentoGee } from 'src/app/models/monitoramentoGee';

@Component({
  selector: 'app-fonte-entidade',
  templateUrl: './fonte-entidade.component.html',
  styleUrls: ['./fonte-entidade.component.sass']
})
export class FonteEntidadeComponent implements OnInit {
  fonteEntidade: any = [];
  entidades: any;
  entidade: any;
  selected: any = [];
  rowsFonteEntidade: any[];
  groups = [];
  params: any;
  nmReduzido: string;
  nmPropriedade: string;
  currentMonitoramentoGee: MonitoramentoGee;

  columnsFonteEntidade = [
    {name : 'Classificação', prop : 'nm_classificacao', width : '35%', selecionado: true},
    {name : 'Fonte', prop : 'nm_fonte_emissao', width : '35%', selecionado: true},
    {name : 'Combustível', prop : 'nm_combustivel', width : '35%', selecionado: true},
    {name : 'Total CO2 Fóssel', prop : 'qt_total_co2_fossel', width : '35%', selecionado: true},
    {name : 'Total CO2 Bio', prop : 'qt_total_co2_bio', width : '35%', selecionado: true},
    {name : '', prop : 'icons', width : '35%', selecionado: true}
  ];


  constructor(private router: Router,
              private route: ActivatedRoute,
              private geeService: GeeService,
              private data: DataService,
              private dialogBox: DialogBoxService,
              private toastrService: ToastrService,
              private monitoramentoGeeService: MonitoramentoGeeService,
              private entidadeService: EntidadeService,
              private geeDataServiceService: GeeDataServiceService) { }



  ngOnInit() {
    // this.populaEntidades();
    this.geeDataServiceService.currentMonitoramentoGee.subscribe(data => {
      this.currentMonitoramentoGee = data;
    });
    if (!this.currentMonitoramentoGee) {
      this.router.navigate(['/gee']);
    } else {
      this.populaTable(this.currentMonitoramentoGee);
    }
  }

  populaEntidades() {
    this.entidadeService.listaEntidades().subscribe(entidades => {
      this.entidades = entidades;
    });
  }

  populaTable(gee: MonitoramentoGee) {
    this.geeService.listaFonteEntidade(gee).subscribe((response) => {
      this.fonteEntidade = [...response];
      this.rowsFonteEntidade = [...response];
      this.groups = [...response];
      if (this.rowsFonteEntidade.length) {
        this.nmReduzido = this.rowsFonteEntidade[0].nm_reduzido;
        this.nmPropriedade = this.rowsFonteEntidade[0].nm_propriedade;
      } else {
        this.nmReduzido = null;
      }
    });
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.inserirEmissao($event.row);
    }
  }

  changeEntidade() {
    if (this.entidade) {
      this.populaTable(this.entidade.entidade_id);
    }
  }

  inserirEmissao(monitoramento: any) {
    if (monitoramento == null) {
      alert('Selecione uma Fonte de Emissao!');
      return;
    }
    this.data.changeFonteEmissao(monitoramento);
    this.router.navigate(['/gee/fontes-cadastro/' + monitoramento.monitoramento_gee_id]);
  }

  editar(id: string) {
    this.router.navigate(['/gee/editar/' + id]);
  }

  removerFonte(monitoramento: any) {
    this.dialogBox.show('Confirme remoção da Fonte e todas suas Amostras?', 'CONFIRM').then(sim => {
      if (sim) {
        this.monitoramentoGeeService.deleteMonitoramentoGee(monitoramento.monitoramento_gee_id).subscribe(data => {
          this.showSuccess('Fonte Monitorada removida com Sucesso!', 'Mensagem');
          this.populaTable(this.params.id);
        });
      }
    });
  }

  goEntidadesMonitoradas() {
    this.router.navigate(['/gee']);
  }

  showSuccess(message: string, title: string) {
    this.toastrService.success(message, title, {
      timeOut: 3000,
    });
  }

}
