import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ArquivoMonitoramentoRecurso } from 'src/app/models/arquivoMonitoramentoRecurso';
import { ArquivoMonitoramentoService } from 'src/app/services/monitoramentoRecurso/arquivo-monitoramento.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-arquivo-monitoramento-recurso',
  templateUrl: './arquivo-monitoramento-recurso.component.html',
  styleUrls: ['./arquivo-monitoramento-recurso.component.sass']
})
export class ArquivoMonitoramentoRecursoComponent implements OnInit {

  monitoramento: any;
  laudo: any;
  isAddEdit = false;
  arquivos: [];
  loading = false;
  arquivoLa: ArquivoMonitoramentoRecurso;
  byteArray: string | ArrayBuffer;
  file: any;

  public onClose: Subject<any>;

  constructor(public modalRef: BsModalRef,
              private dialogBox: DialogBoxService,
              private toastrService: ToastrService,
              private arquivoMonitoramentoService: ArquivoMonitoramentoService) { }

  ngOnInit() {
    this.onClose = new Subject();
    console.log(JSON.stringify(this.monitoramento));
    console.log(JSON.stringify(this.laudo));
    this.getByMonitoramentoId(this.laudo.id);
  }

  public closeModal(): void {
    this.onClose.next(this.monitoramento);
    this.modalRef.hide();
  }

  getByMonitoramentoId(id: any) {
    this.loading = true;
    this.arquivoMonitoramentoService.getByMonitoramentoId(id).subscribe(data => {
      this.arquivos = data;
      this.loading = false;
    }, () => this.loading = false);
  }

  prepareFile(event) {
    const doc: any = document;
    const file = doc.querySelector('input[type=file]').files[0];
    if (!file) { return; }

    const reader = new FileReader();
    if (file) {
      reader.onload = (e) => {
        this.byteArray = reader.result;
      };
    }
    console.log('len ' + this.byteArray.slice);
    reader.readAsDataURL(file);
  }

  save() {
    this.loading = true;
    const doc: any = document;
    const file = doc.querySelector('input[type=file]').files[0];
    const arquivo = new ArquivoMonitoramentoRecurso();

    arquivo.monitoramento_laudo_id = this.laudo.id;
    arquivo.nr_laudo = this.laudo.nr_laudo;
    arquivo.nm_arquivo = file.name;
    arquivo.arquivo = this.byteArray.toString();
    this.arquivoMonitoramentoService.add(arquivo).subscribe(data => {
      this.showSuccess('Arquivo adicionado com sucesso!', 'Mensagem');
      this.getByMonitoramentoId(this.monitoramento.id);
      this.byteArray = null;
      this.file = null;
      this.loading = false;
    },() => this.loading = false);
  }

  remover(id: string) {
    this.dialogBox.show('Confirma remoção do anexo?', 'CONFIRM').then(sim => {
      if (sim) {
        this.arquivoMonitoramentoService.remove(id).subscribe(data => {
          this.showSuccess('Arquivo removido com sucesso!', 'Mensagem');
          this.getByMonitoramentoId(this.monitoramento.id);
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
