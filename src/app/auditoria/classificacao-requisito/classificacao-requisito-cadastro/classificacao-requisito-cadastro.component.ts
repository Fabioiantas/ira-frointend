import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassificacaoRequisito } from 'src/app/models/classificacaoRequisito';
import { ClassificacaoRequisitoService } from 'src/app/services/auditoria/classificacao-requisito.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-classificacao-requisito-cadastro',
  templateUrl: './classificacao-requisito-cadastro.component.html',
  styleUrls: ['./classificacao-requisito-cadastro.component.sass']
})
export class ClassificacaoRequisitoCadastroComponent implements OnInit {

  // --pagecad
  formGroup = new FormGroup({
    id: new FormControl(''),
    nm_classificacao: new FormControl('', Validators.required),
    ds_classificacao: new FormControl(''),
    sg_classificacao: new FormControl('', Validators.required)
  });

  classificacaoRequisito: ClassificacaoRequisito = new ClassificacaoRequisito();
  params: any;
  isLoading: any = false;

  id: any;
  nmParametro: any;
  dsParametro: any;

  constructor(private classificacaoRequisitoService: ClassificacaoRequisitoService,
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.formGroup.reset();
    this.route.params.subscribe(data => {
      this.params = data;
    });
    if (this.params.id) {
      this.classificacaoRequisitoService.getById(this.params.id).subscribe(classificacaoRequisito => {
        this.classificacaoRequisito = classificacaoRequisito;
        this.formGroup.patchValue({
          id: classificacaoRequisito.id,
          nm_classificacao: classificacaoRequisito.nm_classificacao,
          ds_classificacao: classificacaoRequisito.ds_classificacao,
          sg_classificacao: classificacaoRequisito.sg_classificacao
        });
      });
    }
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    console.log(this.formGroup.value.id);

    this.classificacaoRequisitoService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Nível salvo com sucesso!', 'OK');
      this.router.navigate(['/classificacaorequisito']);
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/classificacaorequisito']);
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }
}
