import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EscopoGeeService } from 'src/app/services/escopo-gee.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EscopoGee } from 'src/app/models/escopoGee';
import { Arquivo } from 'src/app/models/arquivo';

@Component({
  selector: 'app-escopo-cadastro-gee',
  templateUrl: './escopo-cadastro-gee.component.html',
  styleUrls: ['./escopo-cadastro-gee.component.sass']
})
export class EscopoCadastroGeeComponent implements OnInit {
  formGroup = new FormGroup({
    id: new FormControl(''),
    nm_escopo: new FormControl('', Validators.required),
    ds_escopo: new FormControl('', Validators.required)
  });

  escopo: EscopoGee = new EscopoGee();
  params: any;
  isLoading: any = false;

  id: any;
  nmRecurso: any;
  dsRecurso: any;

  byteArray: string | ArrayBuffer;
  file: any;

  registro: any;
  constructor(private escopoService: EscopoGeeService,
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
    });
    if (this.params.id) {
      this.escopoService.getById(this.params.id).subscribe(escopo => {
        this.escopo = escopo;
        this.formGroup.patchValue({
          id: escopo.id,
          nm_escopo: escopo.nm_escopo,
          ds_escopo: escopo.ds_escopo
        });
      });
    }

  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

  salvar() {
    if (!this.formGroup.valid) { return; }

    let doc: any = document;
    let file = doc.querySelector('input[type=file]').files[0];
    let arquivo = new Arquivo();
    arquivo.nm_arquivo = file.name;
    arquivo.arquivo = this.byteArray.toString();
    this.escopoService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value, arquivo).subscribe(() => {
      this.dialogBox.show('Escopo salvo com sucesso!', 'OK');
      this.router.navigate(['/escopo']);
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/escopo']);
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
  }

  save() {
    let doc: any = document;
    let file = doc.querySelector('input[type=file]').files[0];

    let arquivo = new Arquivo();
    arquivo.nm_arquivo = file.name;
    arquivo.arquivo = this.byteArray.toString();

    this.escopoService.saveFile(arquivo).subscribe(data => {
      console.log('file ' + JSON.stringify(data));
    });
  }

}
