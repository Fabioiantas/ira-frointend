import { Component, OnInit } from '@angular/core';
import { TipoAtividadeService } from 'src/app/services/tipo-atividade.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoAtividade } from 'src/app/models/tipoatividade';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-atividade-cadastro',
  templateUrl: './tipo-atividade-cadastro.component.html',
  styleUrls: ['./tipo-atividade-cadastro.component.sass']
})
export class TipoAtividadeCadastroComponent implements OnInit {
  formGroup = new FormGroup({
    id: new FormControl(''),
    nm_atividade: new FormControl('', Validators.required)
  });

  tipoAtividade: TipoAtividade = new TipoAtividade();
  params: any;
  isLoading: any = false;

  id: any;
  nmAtividade: any;

  constructor(private tipoAtividadeService: TipoAtividadeService, 
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
    });
    if (this.params.id) {
      this.tipoAtividadeService.getById(this.params.id).subscribe(tipoAtividade => {
        this.tipoAtividade = tipoAtividade;
        this.formGroup.patchValue({
          id: tipoAtividade.id,
          nmAtividade: tipoAtividade.nm_atividade,
        });
      });
    }
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    console.log(this.formGroup.value.id);
    
    this.tipoAtividadeService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Tipo Atividade salva com sucesso!', 'OK');
      this.router.navigate(['/tipoatividade']);
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/tipoatividade']);
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

}
