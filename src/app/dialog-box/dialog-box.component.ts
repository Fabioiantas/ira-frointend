import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.sass']
})
export class DialogBoxComponent implements OnInit {

  botao:any = {};
  type: string;
  title: string;
  msg: string;
  tipoMsg: string;

  public onClose: Subject<boolean>;
  
  constructor(public bsModalRef: BsModalRef){}

  ngOnInit() {
    this.msg = this.msg;
    this.type = this.type.toUpperCase();
    
    this.botao.sim = false;
    this.botao.nao = false;

    if(this.type =='ERROR'){
      this.title = 'Ocorreu um erro';
      this.tipoMsg = 'danger';
    }else if(this.type == 'OK'){
      this.title = 'Mensagem:';
      this.tipoMsg = 'primary';
    }else if(this.type == 'WARNING'){
      this.title = 'Atenção:';
      this.tipoMsg = 'warning';
    }else if(this.type == 'CONFIRM'){
      this.title = 'Confirmação:';
      this.tipoMsg = 'primary';
      this.botao.sim = true;
      this.botao.nao = true;
    }else if(this.type == 'CONFIRMOK'){
      this.title = 'Confirmação:';
      this.tipoMsg = 'primary';
      this.botao.sim = false;
      this.botao.nao = false;
    }

    this.onClose = new Subject();
  }

  botaoConfirmacao(tipo, number){
    
    if(tipo == "sim") 
      this.onClose.next(true);
    else 
      this.onClose.next(false);

    this.onClose.complete();
    
    this.bsModalRef.hide();

  }

  closeModal(){
    this.onClose.next(this.type == 'CONFIRMOK' || this.type == 'CONFIRM' ? false : true);
    this.onClose.complete();
    this.bsModalRef.hide();
  }

  fecharDialogBox(number){

    this.onClose.next(null);
    this.onClose.complete();
    this.bsModalRef.hide();

  }
}
