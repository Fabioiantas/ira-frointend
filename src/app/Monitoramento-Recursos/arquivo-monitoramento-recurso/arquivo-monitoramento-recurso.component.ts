import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arquivo-monitoramento-recurso',
  templateUrl: './arquivo-monitoramento-recurso.component.html',
  styleUrls: ['./arquivo-monitoramento-recurso.component.sass']
})
export class ArquivoMonitoramentoRecursoComponent implements OnInit {

  monitoramento: any;
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
    this.getByLicencaId(this.monitoramento.id);
  }

  public closeModal(): void {
    this.onClose.next(this.monitoramento);
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

    arquivo.monitoramento_ambiental_id = this.monitoramento.id;
    arquivo.nr_monitoramento_ambiental = this.monitoramento.nr_monitoramento_ambiental;
    arquivo.nr_protocolo = this.monitoramento.nr_protocolo;
    arquivo.nm_arquivo = file.name;
    arquivo.arquivo = this.byteArray.toString();
    this.arquivoLicencaAmbientalService.add(arquivo).subscribe(data => {
      this.showSuccess('Arquivo adicionado com sucesso!', 'Mensagem');
      this.getByLicencaId(this.monitoramento.id);
      this.byteArray = null;
    });
  }

  remover(id: string) {
    this.dialogBox.show('Confirma remoção do anexo?', 'CONFIRM').then(sim => {
      if (sim) {
        this.arquivoLicencaAmbientalService.remove(id).subscribe(data => {
          this.showSuccess('Arquivo removido com sucesso!', 'Mensagem');
          this.getByLicencaId(this.monitoramento.id);
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
