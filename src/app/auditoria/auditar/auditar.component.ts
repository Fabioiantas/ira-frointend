import { Component, OnInit } from '@angular/core';
import {ThemeOptions} from '../../theme-options';
import { AuditoriaEntidadeService } from 'src/app/services/auditoria/auditoria-entidade.service';

@Component({
  selector: 'app-auditar',
  templateUrl: './auditar.component.html',
  styleUrls: ['./auditar.component.sass']
})
export class AuditarComponent implements OnInit {
  nivelItRequisitos: any;
  auditoriaEntidadeItRequisito: any[] = [];
  oneAtATime = true;

  constructor(public globals: ThemeOptions, private auditoriaEntidadeService: AuditoriaEntidadeService) { }

  ngOnInit() {
    this.getAuditoriaEntidadeItRequisito();
  }

  getAuditoriaEntidadeItRequisito() {
    this.auditoriaEntidadeService.getAuditoriaEntidadeItReqById(2).subscribe(data => {
      this.auditoriaEntidadeItRequisito = data;
    });
  }

  log(event: boolean) {
    if (event) {
      console.log('open');
    } else {
      console.log('close');
    }
  }

}
