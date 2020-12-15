import { CommaPipe } from './../../pipes/comma.pipe';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AmostraGee } from 'src/app/models/amostraGee';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitoramentoGeeService } from 'src/app/services/monitoramento-gee.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { MonitoramentoGee } from 'src/app/models/monitoramentoGee';
import { AmostraService } from 'src/app/services/amostra.service';
import { DataService } from 'src/app/services/data.service';
import { FontesEntidade } from 'src/app/models/fontesEntidade';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-gee-fonte-cadastro',
  templateUrl: './gee-fonte-cadastro.component.html',
  styleUrls: ['./gee-fonte-cadastro.component.sass'],
  providers: [CommaPipe]
})
export class GeeFonteCadastroComponent implements OnInit {

  amostras: AmostraGee;
  amostraGee: AmostraGee;
  monitoramentoGee: MonitoramentoGee;
  fontesEntidade: FontesEntidade;
  fonte: any;
  params: any;
  totalCo2Fossel = 0;
  totalCo2Bio = 0;
  isAddEdit: boolean;
  loading: boolean;
  inseting = false;

  constructor(private amostraGeeService: AmostraService,
              private monitoramentoGeeService: MonitoramentoGeeService,
              private data: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private dialogBox: DialogBoxService,
              private toastrService: ToastrService,
              private commaPipe: CommaPipe) { }

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
      this.findFonte();
      if (!this.fontesEntidade) {
        this.router.navigate(['/gee']);
      }
    }
  }

  populaTable(id: any) {
    this.amostraGeeService.findAmostra(id).subscribe(amostras => {
      this.amostras = amostras;
      Object.entries(this.amostras).forEach(
          ([key, value]) => {
            this.totalCo2Fossel += value.qt_total_co2_fossel;
            this.totalCo2Bio += value.qt_total_co2_bio;
      });
    });
  }

  findFonte() {
    this.data.curFonteEmissao.subscribe(fonte => {
      this.fontesEntidade = fonte;
    });
  }

  add() {
    this.amostraGee = new AmostraGee();
    this.isAddEdit = true;
    this.inseting = true;
    if (this.fontesEntidade) {
      // tslint:disable-next-line:max-line-length
      this.amostraGee.cd_unidade_padrao = this.fontesEntidade.cd_unidade_calculo ? this.fontesEntidade.cd_unidade_calculo : this.fontesEntidade.cd_unidade_combustivel;
    }
  }

  addItem() {
    if (!this.amostraGee.dt_amostra || !this.amostraGee.cd_unidade_padrao || !this.amostraGee.qt_consumo_total) {
      return this.dialogBox.show('É nescessário preencher todos os campos', 'Warning');
    }
    this.loading = true;
    this.amostraGee.monitoramento_gee_id = this.monitoramentoGee.id;
    this.amostraGeeService[this.amostraGee.id ? 'editar' : 'salvar'](this.amostraGee).subscribe(() => {
      this.loading = false;
      this.inseting = false;
      this.isAddEdit = false;
      this.amostraGee = new AmostraGee();
      this.populaTable(this.params.id);
      this.showSuccess('Amostra Adicionada com Sucesso!', 'Mensagem');
    }, () => this.loading = false);
  }

  editarItem(amostra: AmostraGee) {
    this.amostraGee.id = amostra.id;
    this.amostraGee.dt_amostra = new Date(amostra.dt_amostra);
    this.amostraGee.cd_unidade_padrao = amostra.cd_unidade_padrao;
    this.amostraGee.qt_quilometragem_total = amostra.qt_quilometragem_total;
    this.amostraGee.qt_consumo_total = amostra.qt_consumo_total;
  }

  cancelar() {
    this.amostraGee = new AmostraGee();
    this.inseting = false;
  }

  removerAmostra(amostra: AmostraGee) {
    this.dialogBox.show('Tem certeza que deseja remover a amostra?', 'Confirm').then((sim) => {
      if (sim) {
        this.loading = true;
        this.amostraGeeService.remover(amostra.id).subscribe(() => {
          this.loading = false;
          this.showSuccess('Amostra Removida com Sucesso!', 'Mensagem');
          this.populaTable(this.params.id);
        }, () => this.loading = false);
      }
    });
  }

  changeQuilometragem() {
    this.amostraGee.qt_consumo_total = Number((this.amostraGee.qt_quilometragem_total / this.fontesEntidade.qt_consumo).toFixed(2));
 }

 goFontesMonitoradas() {
  this.router.navigate(['/gee/fontes/' + this.monitoramentoGee.entidade_id]);
 }

  showSuccess(message: string, title: string) {
    this.toastrService.success(message, title, {
    timeOut: 3000,
    });
  }

  formatUserNumber() {
    this.amostraGee.qt_consumo_total = this.commaPipe.transform(this.amostraGee.qt_consumo_total);
  }

}
