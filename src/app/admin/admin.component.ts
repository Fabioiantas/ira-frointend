import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxService } from '../_services/dialog-box.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  heading = 'Admin Page';
  subheading = 'Gerenciamento de Licenças Ambientais.';
  icon = 'fa fa-medkit icon-gradient bg-tempting-azure';

  closeResult: string;

  constructor(public modalService: NgbModal, private dialogBox: DialogBoxService) {
  }
  ngOnInit() {
    this.dialogBox.show("Teste","CONFIRM").then(sim=>{
      if(sim){
        debugger;
      }
    });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openLarge(content) {
    this.modalService.open(content, {
      size: 'lg'
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
