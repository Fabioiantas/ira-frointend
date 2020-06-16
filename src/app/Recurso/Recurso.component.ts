import { RecursoServiceService } from 'src/app/services/recurso-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Recurso } from '../models/recurso';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-recurso',
  templateUrl: './Recurso.component.html',
  styleUrls: ['./Recurso.component.css']
})
export class RecursoComponent implements OnInit {
  recursos: any = [];
  selected: any = [];
  rowsRecurso: any[];



  columnsRecurso = [
    {name : 'Recurso', prop : 'nm_recurso', width : '35%', selecionado: true},
    {name : 'Descrição', prop : 'ds_recurso', width : '20%', selecionado: false}
  ];

  constructor(private http: HttpClient, private router: Router,
              private recursoService: RecursoServiceService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.recursoService.listar().subscribe((response) => {
      this.recursos = [...response];
      this.rowsRecurso = [...response];
    });
  }

  remove(recurso: Recurso) {
    return this.http.post(environment.baseUrl + '/Recurso/remove', Recurso);
  }

  editar(id) {
    console.log('editar: ' + id);
    this.router.navigate(['/recurso/adicionar/' + id]);
  }

  editarForm(e){
    this.editar(this.selected[0].id, this.selected[0].nm_recurso, this.selected[0].ds_recurso);
  }

  editar() {
    let selectedRows = this.selected;
    if(selectedRows.length == 1){
      selectedRows = selectedRows[0];
      this.router.navigate(['/recurso/adicionar/'+selectedRows.cdEmpresa+'/'+selectedRows.cdSafra+'/'+selectedRows.ieTipoSafra+'/'+selectedRows.cdCultura+'/'+selectedRows.cdProduto]);
    } else {
      this.dialogBox.show('Selecione uma linha para alterar!', "warning");
    }
  }

  getById(id: any) {
    return this.http.get<Recurso>(environment.baseUrl + '/Recurso/id/' + id);
  }

}
