import { ArquivoLicencaAmbientalService } from './../../../services/licenciamento/arquivo-licenca-ambiental.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ArquivoLicencaAmbiental } from 'src/app/models/arquivoLicencaAmbiental';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-arquivo-licenca-cadastro',
  templateUrl: './arquivo-licenca-cadastro.component.html',
  styleUrls: ['./arquivo-licenca-cadastro.component.sass']
})
export class ArquivoLicencaCadastroComponent implements OnInit {

  licenca: any;
  isAddEdit = false;
  arquivos: [];
  arquivoLa: ArquivoLicencaAmbiental;
  byteArray: string | ArrayBuffer;
  file: any;

  public onClose: Subject<any>;

  constructor(public modalRef: BsModalRef,
              private dialogBox: DialogBoxService,
              private toastrService: ToastrService,
              private arquivoLicencaAmbientalService: ArquivoLicencaAmbientalService) { }

  ngOnInit() {
    this.onClose = new Subject();
    this.getByLicencaId(this.licenca.id);
  }

  public closeModal(): void {
    this.onClose.next(this.licenca);
    this.modalRef.hide();
  }

  getByLicencaId(id: any) {
    this.arquivoLicencaAmbientalService.getByLicencaId(id).subscribe(data =>{
      this.arquivos = data;
      console.log('arq ' + JSON.stringify(this.arquivos));
    });
  }

  prepareFile(event){
    let doc: any = document;
    let file = doc.querySelector('input[type=file]').files[0];

    if (file) {
      var reader = new FileReader();
      reader.onload = (e) =>{
        this.byteArray = reader.result;
      };
    }
    reader.readAsDataURL(file);
    // this.save(this.byteArray)
  }

  save() {
    let doc: any = document;
    let file = doc.querySelector('input[type=file]').files[0];
    let arquivo = new ArquivoLicencaAmbiental();

    arquivo.licenca_ambiental_id = this.licenca.id;
    arquivo.nr_licenca_ambiental = this.licenca.nr_licenca_ambiental;
    arquivo.nr_protocolo = this.licenca.nr_protocolo;
    arquivo.nm_arquivo = file.name;
    arquivo.arquivo = this.byteArray.toString();
    this.arquivoLicencaAmbientalService.add(arquivo).subscribe(data => {
      this.showSuccess('Arquivo adicionado com sucesso!', 'Mensagem');
      this.getByLicencaId(this.licenca.id);
      this.byteArray = null;
    });
  }

  remover(id: string) {
    this.dialogBox.show('Confirma remoção do anexo?', 'CONFIRM').then(sim => {
      if (sim) {
        this.arquivoLicencaAmbientalService.remove(id).subscribe(data => {
          this.showSuccess('Arquivo removido com sucesso!', 'Mensagem');
          this.getByLicencaId(this.licenca.id);
        });
      }
    });
  }

  download(arquivo: any, nmArquivo: string) {
    UtilsService.downloadFile(UtilsService.dataURItoBlob(arquivo), '', nmArquivo);
  }

  showSuccess(message: string, title: string) {
    this.toastrService.success(message, title, {
      timeOut: 3000,
    });
  }

  showWarning(message: string, title: string) {
    this.toastrService.warning(message, title, {
      timeOut: 3000,
    });
  }

  showInfo(message: string, title: string) {
    this.toastrService.info(message, title, {
      timeOut: 3000,
    });
  }

}
