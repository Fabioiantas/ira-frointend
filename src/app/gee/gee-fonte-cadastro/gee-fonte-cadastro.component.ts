import { Component, OnInit } from '@angular/core';
import { AmostraGee } from 'src/app/models/amostraGee';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MonitoramentoGeeService } from 'src/app/services/monitoramento-gee.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { MonitoramentoGee } from 'src/app/models/monitoramentoGee';
import { AmostraService } from 'src/app/services/amostra.service';

@Component({
  selector: 'app-gee-fonte-cadastro',
  templateUrl: './gee-fonte-cadastro.component.html',
  styleUrls: ['./gee-fonte-cadastro.component.sass']
})
export class GeeFonteCadastroComponent implements OnInit {

  amostras: AmostraGee;
  amostraGee: AmostraGee;
  monitoramentoGee: MonitoramentoGee;
  monitoramento_gee_id: number;
  fonte: any;
  params: any;
  isAddEdit: boolean;
  loading: boolean;

  constructor(private amostraGeeService: AmostraService,
              private monitoramentoGeeService: MonitoramentoGeeService,
              private route: ActivatedRoute,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.amostraGee = new AmostraGee();
    this.route.params.subscribe(params => {
      this.params = params;
    });
    if (this.params.id) {
      this.monitoramentoGeeService.findById(this.params.id).subscribe(monitoramento => {
        this.monitoramentoGee = monitoramento;
      });
      this.populaTable(this.params.id);
      this.findFonte(this.params.id);
    }
  }

  populaTable(id: any) {
    this.amostraGeeService.findAmostra(id).subscribe(amostras => {
      this.amostras = amostras;
    });
  }

  findFonte(id: any) {
    this.monitoramentoGeeService.findFonte(id).subscribe(fonte => {
      this.fonte = fonte[0];
    });
  }

  add() {
    this.amostraGee = new AmostraGee();
    this.isAddEdit = true;
  }

  addItem() {
    if (!this.amostraGee.dt_amostra || !this.amostraGee.cd_unidade_padrao || !this.amostraGee.qt_consumo_total) {
      return this.dialogBox.show('É nescessário preencher todos os campos', 'Warning');
    }
    this.loading = true;
    this.amostraGee.monitoramento_gee_id = this.monitoramentoGee.id;
    this.amostraGee.dt_amostra = moment(this.amostraGee.dt_amostra).format('YYYY-MM-DD');
    this.amostraGeeService.salvar(this.amostraGee).subscribe(data => {
      this.loading = false;
      this.isAddEdit = false;
      this.amostraGee = new AmostraGee();
      this.populaTable(this.params.id);
    }, () => this.loading = false);
  }

}
