import { FonteEmissao } from './../../../../models/fonteEmissao';
import { EscopoGee } from './../../../../models/escopoGee';
import { FilterGee } from './../../../../models/filter-gee';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gee-cadastro',
  templateUrl: './gee-cadastro.component.html',
  styleUrls: ['./gee-cadastro.component.sass']
})
export class GeeCadastroComponent implements OnInit {

  heading = 'Programação Fármacos';
  subheading = 'Programação de produtos farmáceuticos.';
  icon = 'lnr-calendar-full';
  toggleMobileSidebar: any;

  // model: any;
  // searching = false;
  // searchFailed = false;
  // filterForm: FormGroup;
  // filter: FilterGee = new FilterGee();
  // produtoSelecionado = null;
  // loading = false;
  // escopo: EscopoGee;
  // fonteEmissao: FonteEmissao[];
  // cooperados: any;
  // isAddEdit = false;
  // formBuilder: any;

  constructor() { }

  ngOnInit() {
    // this.filterForm = this.formBuilder.group({
    //   entidade: [null, Validators.required],
    //   propriedade: [null, Validators.required],
    //   fonteEmissao: [null, Validators.required],
    //   tipoCombustivel: [null, Validators.required]
    // });
  }

}
