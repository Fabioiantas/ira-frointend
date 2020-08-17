import { Component, OnInit } from '@angular/core';
import { AmostraService } from 'src/app/services/amostra.service';
import { AmostraGee } from 'src/app/models/amostraGee';
import { ActivatedRoute } from '@angular/router';
import { MonitoramentoGeeService } from 'src/app/services/monitoramento-gee.service';

@Component({
  selector: 'app-gee-fonte-cadastro',
  templateUrl: './gee-fonte-cadastro.component.html',
  styleUrls: ['./gee-fonte-cadastro.component.sass']
})
export class GeeFonteCadastroComponent implements OnInit {

  amostrasGee: AmostraGee;
  fonte: any;
  params: any;

  constructor(private amostraService: AmostraService,
             private monitoramentoGeeService: MonitoramentoGeeService,
             private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = params;
    });
    if (this.params.id) {
      this.populaTable(this.params.id);
      this.findFonte(this.params.id);
    }
  }

  populaTable(id: any) {
    this.amostraService.findAmostra(id).subscribe(amostras => {
      this.amostrasGee = amostras;
    });
  }

  findFonte(id: any) {
    this.monitoramentoGeeService.findFonte(id).subscribe(fonte => {
      this.fonte = fonte[0];
    });
  }


}
