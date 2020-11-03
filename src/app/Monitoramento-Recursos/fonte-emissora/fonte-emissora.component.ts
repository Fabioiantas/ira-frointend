import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { FonteEmissora } from 'src/app/models/fonte-emissora';
import { FonteEmissoraService } from 'src/app/services/fonte-emissora.service';

@Component({
  selector: 'app-fonte-emissora',
  templateUrl: './fonte-emissora.component.html',
  styleUrls: ['./fonte-emissora.component.sass']
})
export class FonteEmissoraComponent implements OnInit {
  fonteEmissora: any = [];
  selected: any = [];
  rowsFonteEmissora: any[];

  columnsFonteEmissora = [
    {name : 'FonteEmissora', prop : 'nm_fonte_emissora', width : '35%', selecionado: true},
    {name : 'Descrição', prop : 'ds_fonte_emissora', width : '20%', selecionado: false},
    {name : 'Classificação', prop : 'ds_classificacao', width : '20%', selecionado: false},
    {name : 'Observação', prop : 'ds_observacao', width : '20%', selecionado: false}
  ];

  constructor(private router: Router,
              private fonteEmissoraService: FonteEmissoraService,
              private dialogBox: DialogBoxService) { }

  ngOnInit() {
    this.populaTable();
  }

  populaTable() {
    this.fonteEmissoraService.listar().subscribe((response) => {
      this.fonteEmissora = [...response];
      this.rowsFonteEmissora = [...response];
    });
  }

  remover() {
    if (this.selected) {
      this.dialogBox.show("Confirma remoção do Fonte de Emissão?","CONFIRM").then(sim=>{
        if(sim){
          this.fonteEmissoraService.remove(this.selected[0].id).subscribe(data => {
            this.dialogBox.show('Fonte de Emissão removida com sucesso!', 'OK');
            this.populaTable();
          });
        }
      });
    }
  }

  editar(id) {
    this.router.navigate(['/fonteemissora/adicionar/' + id])
  }

  editarForm(e){
    this.editar(this.selected[0].id);
  }

  activate($event) {
    if ($event.type === 'dblclick') {
      this.router.navigate(['/fonteemissora/adicionar/' + $event.row.id]);
    }
  }
}
