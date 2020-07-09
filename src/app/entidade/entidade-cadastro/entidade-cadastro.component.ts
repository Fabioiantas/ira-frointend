import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Entidade } from 'src/app/models/entidade';
import { EntidadeService } from 'src/app/services/entidade.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-entidade-cadastro',
  templateUrl: './entidade-cadastro.component.html',
  styleUrls: ['./entidade-cadastro.component.sass']
})
export class EntidadeCadastroComponent implements OnInit {
  formGroup = new FormGroup({
    id: new FormControl(''),
    nm_entidade: new FormControl('', Validators.required),
    nm_reduzido: new FormControl('', Validators.required),
    nr_cnpj: new FormControl('',[
      Validators.required,
      Validators.pattern("[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}")
    ]),
    nr_cpf: new FormControl('',[
      Validators.required,
      Validators.pattern("[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}")]
      ),
    ds_endereco: new FormControl('', Validators.required),
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    nr_telefone: new FormControl('', Validators.required)
  });

  entidade: Entidade = new Entidade();
  params: any;
  isLoading: any = false;

  id: any;
  nmEntidade: any;
  nmReduzido: any;
  nrCnpj: any;
  nrCpf: any;
  dsEndereco: any;
  email: any;
  nrTelefone: any;

  constructor(private entidadeService: EntidadeService,
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
    });

    if (this.params.id) {
      this.entidadeService.getById(this.params.id).subscribe(entidade => {
        this.entidade = entidade;
        this.formGroup.patchValue({
          id: entidade.id,
          nmEntidade: entidade.nm_entidade,
          nmReduzido: entidade.nm_reduzido,
          nrCnpj: entidade.nr_cnpj,
          nrCpf: entidade.nr_cpf,
          dsEndereco: entidade.ds_endereco,
          email: entidade.email,
          nrTelefone: entidade.nr_telefone

        });
      });
    }
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    console.log(this.formGroup.value.id);

    this.entidadeService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Entidade salva com sucesso!', 'OK');
      this.router.navigate(['/entidade']);
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/entidade']);
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

}
