import { Component, OnInit } from '@angular/core';
import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'app-monitoramento-parametros',
  templateUrl: './monitoramento-parametros.component.html',
  styleUrls: ['./monitoramento-parametros.component.sass']
})
export class MonitoramentoParametrosComponent implements OnInit {

  editing = {};
  rows = [];

  ColumnMode = ColumnMode;

  constructor() { }

  ngOnInit() {
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

}
