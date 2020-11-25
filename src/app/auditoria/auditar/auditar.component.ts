import { Component, OnInit } from '@angular/core';
import { AuditoriaEntidadeService } from 'src/app/services/auditoria/auditoria-entidade.service';

@Component({
  selector: 'app-auditar',
  templateUrl: './auditar.component.html',
  styleUrls: ['./auditar.component.sass']
})
export class AuditarComponent implements OnInit {
  nivelItRequisitos: any;
  auditoriaEntidadeItRequisito: any[] = [];
  oneAtATime: boolean = true;

  constructor(private auditoriaEntidadeService: AuditoriaEntidadeService) { }

  ngOnInit() {
    this.getAuditoriaEntidadeItRequisito();
  }

  getAuditoriaEntidadeItRequisito() {
    this.auditoriaEntidadeService.getAuditoriaEntidadeItReqById(1).subscribe(data => {
      this.auditoriaEntidadeItRequisito = data;
      console.log(JSON.stringify(this.auditoriaEntidadeItRequisito));
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
