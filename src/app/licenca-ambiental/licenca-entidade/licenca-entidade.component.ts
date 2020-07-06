import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { LicencaEntidadeService } from 'src/app/services/licenca-entidade.service';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-licenca-entidade',
  templateUrl: './licenca-entidade.component.html',
  styleUrls: ['./licenca-entidade.component.sass']
})
export class LicencaEntidadeComponent implements OnInit {

  licencaEntidade: any = [];
  selected: any = [];
  rowsLicencaEntidade: any[];
  protocolar: any[] = [];
  foraPrazo: any[] = [];
  vencida: any[] = [];
  protocolada: any[] = [];
  vigente: any[] = [];

  columnsLicencaEntidade = [
    {name : 'Entidade', prop : 'nm_reduzido', width : '50%', selecionado: true},
    {name : 'Total L.A', prop : 'nr_total_licenca', width : '50%', selecionado: true},
    {name : 'Vigêntes', prop : 'nr_total_vigente', width : '50%', selecionado: true},
    {name : 'Protocolar', prop : 'nr_total_protocolar', width : '50%', selecionado: true},
    {name : 'Protocolada', prop : 'nr_total_protocolada', width : '50%', selecionado: true},
    {name : 'Fora do Prazo', prop : 'nr_total_prot_fora_prazo', width : '50%', selecionado: true},
    {name : 'Vencidas', prop : 'nr_total_vencida', width : '50%', selecionado: true},
  ];
  constructor(private router: Router,
              private licencaEntidadeService: LicencaEntidadeService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
    this.getTotalVigente();
    this.getTotalProtocolar();
    this.getTotalProtocolada();
    this.getTotalForaPrazo();
    this.getTotalVencidas();
  }

  populaTable() {
    this.licencaEntidadeService.getAll().subscribe((response) => {
      this.licencaEntidade = [...response];
      this.rowsLicencaEntidade = [...response];
    });
  }

  getTotalVigente() {
    this.licencaEntidadeService.getTotalProtocolar('VIGENTE').subscribe(response => {
      this.vigente = response;
    });
  }

  getTotalProtocolar() {
    this.licencaEntidadeService.getTotalProtocolar('PROTOCOLAR').subscribe(response => {
      this.protocolar = response;
    });
  }

  getTotalForaPrazo() {
    this.licencaEntidadeService.getTotalProtocolar('PROT. FORA DO PRAZO').subscribe(response => {
      this.foraPrazo = response;
    });
  }

  getTotalVencidas() {
    this.licencaEntidadeService.getTotalProtocolar('VENCIDA').subscribe(response => {
      this.vencida = response;
    });
  }

  getTotalProtocolada() {
    this.licencaEntidadeService.getTotalProtocolar('PROTOCOLADA').subscribe(response => {
      this.protocolada = response;
    });
  }

  getTotais(entidade, situacao) {
    // console.log(JSON.stringify(this.totais));
    if (situacao === 'VIGENTE') {
      for (let i = 0; i < this.vigente.length; i++) {
        return this.vigente[i].id_entidade === entidade.id_entidade ? this.vigente[i].total : 0;
      }
      return 0;
    }
    if (situacao === 'PROTOCOLAR') {
      for (let i = 0; i < this.protocolar.length; i++) {
        return this.protocolar[i].id_entidade === entidade.id_entidade ? this.protocolar[i].total : 0;
      }
      return 0;
    }
    if (situacao === 'PROT. FORA DO PRAZO') {
      for (let i = 0; i < this.foraPrazo.length; i++) {
        return this.foraPrazo[i].id_entidade === entidade.id_entidade ? this.foraPrazo[i].total : 0;
      }
      return 0;
    }
    if (situacao === 'VENCIDA') {
      for (let i = 0; i < this.vencida.length; i++) {
        return this.vencida[i].id_entidade === entidade.id_entidade ? this.vencida[i].total : 0;
      }
      return 0;
    }
    if (situacao === 'PROTOCOLADA') {
      for (let i = 0; i < this.protocolada.length; i++) {
        return this.protocolada[i].id_entidade === entidade.id_entidade ? this.protocolada[i].total : 0;
      }
      return 0;
    }
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/licencaambiental/adicionar/' + $event.row.id]);
    }
  }

  editar(id) {
    console.log(id);
  }

  remover() {

  }

}
