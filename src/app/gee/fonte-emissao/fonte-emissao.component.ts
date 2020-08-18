import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FonteEmissaoService } from 'src/app/services/fonte-emissao.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-fonte-emissao',
  templateUrl: './fonte-emissao.component.html',
  styleUrls: ['./fonte-emissao.component.sass']
})
export class FonteEmissaoComponent implements OnInit {

  fonteEmissoes: any = [];
  selected: any = [];
  rowsFonteEmissao: any[];

  columnsFonteEmissao = [
    {name : 'Fonte', prop : 'nm_fonte_emissao', width : '35%', selecionado: true},
    {name : 'Class.', prop : 'nm_classificacao', width : '20%', selecionado: false},
    {name : 'UN.', prop : 'cd_unidade_consumo', width : '20%', selecionado: false},
    {name : 'co2', prop : 'nr_fator_co2_movel', width : '20%', selecionado: false},
    {name : 'n2o', prop : 'nr_fator_n2o_movel', width : '20%', selecionado: false},
    {name : 'ch4', prop : 'nr_fator_ch4_movel', width : '20%', selecionado: false},
    {name : 'Fóseel', prop : 'nr_fator_movel_fossel', width : '20%', selecionado: false},
    {name : 'Bio', prop : 'nr_fator_movel_bio', width : '20%', selecionado: false},
    {name : 'Bio M.', prop : 'tipo_combustivel_mistura_id', width : '20%', selecionado: false}
  ];
  constructor(private router: Router,
              private dialogBox: DialogBoxService,
              private fonteEmissaoService: FonteEmissaoService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.fonteEmissaoService.list().subscribe((response) => {
      console.log(JSON.stringify(response));
      this.fonteEmissoes = [...response];
      this.rowsFonteEmissao = [...response];
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show('Confirma remoção do Recurso?', 'CONFIRM').then(sim => {
        if (sim) {
          this.fonteEmissaoService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Recurso removido com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id) {
    console.log('editar: ' + id);
    this.router.navigate(['/recurso/adicionar/' + id]);
  }

  editarForm(e) {
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/recurso/adicionar/' + $event.row.id]);
    }
  }

}
