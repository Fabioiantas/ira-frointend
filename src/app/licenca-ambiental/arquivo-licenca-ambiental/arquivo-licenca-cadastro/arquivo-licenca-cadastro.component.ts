import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-arquivo-licenca-cadastro',
  templateUrl: './arquivo-licenca-cadastro.component.html',
  styleUrls: ['./arquivo-licenca-cadastro.component.sass']
})
export class ArquivoLicencaCadastroComponent implements OnInit {

  licenca: any;
  isAddEdit = false;
  public onClose: Subject<any>;
  constructor(public modalRef: BsModalRef) { }

  ngOnInit() {
    this.onClose = new Subject();
    console.log(JSON.stringify(this.licenca));
  }

  public closeModal(): void {
    this.onClose.next(this.licenca);
    this.modalRef.hide();
  }

}
