import { Injectable } from '@angular/core';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxService {

  constructor(private modalService: BsModalService) { }

  show(msg, type){

    const initialState = {
      title: 'Modal Component',
      msg: msg,
      type: type
    };

    return this.modalService.show(DialogBoxComponent,
      type.toUpperCase() === 'CONFIRMOK' ? { initialState, backdrop: 'static' } : {initialState} )
      .content.onClose.toPromise();
  }

}
