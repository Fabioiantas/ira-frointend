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
    {name : 'Total L.A', prop : 'total', width : '50%', selecionado: true},
    {name : 'Vigêntes', prop : 'total_vigente', width : '50%', selecionado: true},
    {name : 'Protocolar', prop : 'total_protocolar', width : '50%', selecionado: true},
    {name : 'Protocolada', prop : 'total_protocolada', width : '50%', selecionado: true},
    {name : 'Fora do Prazo', prop : 'total_fora_p', width : '50%', selecionado: true},
    {name : 'Vencidas', prop : 'total_vencida', width : '50%', selecionado: true},
  ];
  constructor(private router: Router,
              private licencaEntidadeService: LicencaEntidadeService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.licencaEntidadeService.getAll().subscribe((response) => {
      this.licencaEntidade = [...response];
      this.rowsLicencaEntidade = [...response];
    });
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      //this.router.navigate(['/licencaambiental/adicionar/' + $event.row.id]);
    }
  }

  editar(id) {
    console.log(id);
  }

  remover() {

  }

}
