import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LicencaIap } from 'src/app/models/licencaIap';
import { LicencaAmbientalService } from 'src/app/services/licenca-ambiental.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import * as moment from 'moment';


@Component({
  selector: 'app-licencas-ambientais',
  templateUrl: './licencas-ambientais.component.html',
  styleUrls: ['./licencas-ambientais.component.sass']
})
export class LicencasAmbientaisComponent implements OnInit {
  licencaAmbiental: any = [];
  selected: any = [];
  filha: any = [];
  rowsLicencaAmbiental: any[];
  licecaIap: LicencaIap;

  @ViewChild('detalhes') detalheTemplate;

  columnsLicencaAmbiental = [
    {name : 'N° Licenca Ambiental', prop : 'nr_licenca_ambiental', align: 'right', width : '10%', selecionado: true},
    {name : 'N° Protocolo', prop : 'nr_protocolo', align: 'right', width : '10%', selecionado: true},
    // {name : 'Entidade', prop : 'nm_entidade', width : '50%', selecionado: true},
    {name : 'Entidade', prop : 'nm_reduzido', width : '50%', selecionado: true},
    {name : 'Atividade', prop : 'nm_atividade', width : '20%', selecionado: true},
    {name : 'Tipo', prop : 'nm_abreviado', width : '5%', selecionado: true},
    {name : 'Validade', prop : 'dt_validade', width : '10%', selecionado: true},
    // {name : 'Validade Prot.', prop : 'dt_validade_protocolo', width : '10%', selecionado: true},
    {name : 'Orgão', prop : 'sg_orgao', width : '15%', selecionado: true},
    {name : 'Situação', prop : 'ds_situacao', width : '10%', selecionado: true},
    {name : 'Ação', prop : 'ds_acao', width : '10%', selecionado: true},
    {name : 'id', prop : 'id', width : '50%', selecionado: true}
  ];
  constructor(private router: Router,
              private licencaAmbientalService: LicencaAmbientalService,
              private dialogBox: DialogBoxService,
              public modalService: NgbModal,
              private bsModalService: BsModalService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.licencaAmbientalService.getAll().subscribe((response) => {
      this.licencaAmbiental = [...response];
      this.rowsLicencaAmbiental = [...response];
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show('Confirma remoção da Licença Ambiental?', 'CONFIRM').then((sim: any) => {
        if(sim) {
          this.licencaAmbientalService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Licença removida com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id) {
    this.router.navigate(['/licencaambiental/adicionar/' + id])
  }

  licenciar(licenca) {
    if (licenca !== null) {
      if (licenca.nr_licenca_ambiental !== null) {
        this.dialogBox.show('N° da Licença já informado.', 'WARNING');
      } else {
        this.router.navigate(['/licenciamento/' + licenca.id]);
      }
    }
  }

  protocolar(licenca) {
    if (licenca.nr_licenca_ambiental === null) {
      this.dialogBox.show('Efetue o Licenciamento antes de Protocolar.', 'WARNING');
    } else if (licenca.nr_protocolo_novo !== null) {
      this.dialogBox.show('Licença já Protocolada.', 'WARNING');
    } else {
      this.router.navigate(['/protocolacao/' + licenca.id]);
    }
  }

  renova(licenca) {
    if (licenca.nr_protocolo_novo === null) {
      this.dialogBox.show('Antes de Renovar efetue a Protocolação da Licença.', 'WARNING');
    } else if (licenca.nr_licenca_ambiental === null) {
      this.dialogBox.show('Antes de Renovar efetue o Licenciamento.','WARNING');
    } else {
      this.router.navigate(['/renova/' + licenca.id]);
    }
  }

  editarForm(e) {
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'click' && $event.column.prop === 'ds_acao') {
      this.acao($event.row);
    }
    if ($event.type === 'dblclick') {
      this.router.navigate(['/licencaambiental/adicionar/' + $event.row.id]);
    }
  }

  acao (licenca) {
    if (licenca.nr_licenca_ambiental === null && licenca.nr_protocolo_novo === null) {
      this.router.navigate(['/licenciamento/' + licenca.id]);
    } else if (licenca.nr_licenca_ambiental !== null && licenca.nr_protocolo_novo === null) {
      this.router.navigate(['/protocolacao/' + licenca.id]);
    } else {
      this.router.navigate(['/renova/' + licenca.id]);
    }
  }

  getProximaAcao(licenca) {
    if (licenca.nr_licenca_ambiental == 'licenciado') {
      console.log(JSON.stringify(licenca));
    }
    if (licenca.nr_licenca_ambiental === null && licenca.nr_protocolo_novo === null) {
      return 'Licenciar';
    } else if (licenca.nr_licenca_ambiental !== null && licenca.nr_protocolo_novo === null) {
      return 'Protocolar:' + moment(licenca.dt_validade_protocolo).format('DD/MM/YYYY');
    } else {
      return 'Renovar';
    }
  }

  detalhar() {
    if (this.selected.length > 0) {
      this.licencaAmbientalService.getFilha(this.selected[0].id).subscribe(filha =>{
        this.filha = filha;
      });
      this.modalService.open(this.detalheTemplate);
    }
  }

  anexo(licenca: any) {
    if (!licenca) { alert('selecione uma Licença!'); return; }
    const initialState = {
      licenca
    };
    this.bsModalService.show(ArquivoLicencaCadastroComponent, { initialState, backdrop: 'static', class: 'modal-lg'})
    .content.onClose.subscribe(itemReturn => {
    });
  }

}

function ArquivoLicencaCadastroComponent(ArquivoLicencaCadastroComponent: any, arg1: { initialState: { licenca: any; }; backdrop: string; class: string; }) {
  throw new Error('Function not implemented.');
}
