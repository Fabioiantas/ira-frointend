import { HttpEvent } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-datatable-filter',
  templateUrl: './ngx-datatable-filter.component.html',
  styleUrls: ['./ngx-datatable-filter.component.css']
})
export class NgxDatatableFilterComponent implements OnInit {

  buscaBy: any;
  @Input() lista: any;
  @Input() table: any;
  @Input() columns: any;
  @Input() margin: any;

  @Input() float: any;
  selecionado: any;

  @Output() buscaEvento = new EventEmitter();
  @Input() busca:string;

  constructor() {   }

  ngOnInit() {
    if(!this.margin) this.margin = "15px";
    if(!this.float) this.float = "right";

    const select = this.columns.filter(function (d) {
      return d.selecionado;
    });

    this.selecionado = select.length ? select[0].prop : this.columns[0].prop;
    this.buscaBy = this.selecionado;
  }

  changeBusca(event){
    this.buscaEvento.emit(event.target.value);
  }

  updateFilterHandler(event, table, buscaBy) {
    const val = event.target.value.toLowerCase();
    
    if(!buscaBy) return;

    const filteredData = this.lista.filter(function (d) {
      if(!d[buscaBy]) return false;
      return d[buscaBy].toString().toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.table.rows = [...filteredData];
    this.table.offset = 0;
  }

}
