import { Component, OnInit } from '@angular/core';
import { ProcessoAnalise } from 'src/app/models/processoAnalise';
import { ProcessoAnaliseService } from 'src/app/services/processo-analise.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-processo-analise-cadastro',
  templateUrl: './processo-analise-cadastro.component.html',
  styleUrls: ['./processo-analise-cadastro.component.sass']
})
export class ProcessoAnaliseCadastroComponent implements OnInit {

  formGroup = new FormGroup({
    id: new FormControl(''),
    nm_processo: new FormControl('', Validators.required),
    ds_processo: new FormControl('', Validators.required)
  });

  processo: ProcessoAnalise = new ProcessoAnalise();
  params: any;
  isLoading: any = false;

  id: any;
  nmProcesso: any;
  dsProcesso: any;

  constructor(private recursoService: ProcessoAnaliseService,
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(data => {
      this.params = data;
    });
    if (this.params.id) {
      this.recursoService.getById(this.params.id).subscribe(processo => {
        this.processo = processo;
        this.formGroup.patchValue({
          id: processo.id,
          nm_processo: processo.nm_processo,
          ds_processo: processo.ds_processo
        });
      });
    }
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    console.log(this.formGroup.value.id);

    this.recursoService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Processo salvo com sucesso!', 'OK');
      this.router.navigate(['/processo']);
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/processo']);
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

}
