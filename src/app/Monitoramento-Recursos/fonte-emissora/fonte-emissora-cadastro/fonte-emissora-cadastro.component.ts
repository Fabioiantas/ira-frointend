import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { FonteEmissoraService } from 'src/app/services/fonte-emissora.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FonteEmissora } from 'src/app/models/fonte-emissora';

@Component({
  selector: 'app-fonte-emissora-cadastro',
  templateUrl: './fonte-emissora-cadastro.component.html',
  styleUrls: ['./fonte-emissora-cadastro.component.sass']
})
export class FonteEmissoraCadastroComponent implements OnInit {
  params: any;
  fonteEmissora: FonteEmissora = new FonteEmissora();
  listFonteEmissora: any;

  formGroup = new FormGroup({
    id: new FormControl(''),
    nm_fonte_emissora: new FormControl('', Validators.required),
    ds_fonte_emissora: new FormControl(''),
    ds_classificacao: new FormControl('', Validators.required),
    ds_observacao: new FormControl('')
  });

  constructor(private fonteEmissoraService: FonteEmissoraService,
              private dialogBox: DialogBoxService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
    });

    if (this.params.id) {
      this.fonteEmissoraService.getById(this.params.id).subscribe(fonteEmissora => {
        this.fonteEmissora = fonteEmissora;

        this.formGroup.patchValue({
          id: fonteEmissora.id,
          nm_fonte_emissora:  fonteEmissora.nm_fonte_emissora,
          ds_classificacao: fonteEmissora.ds_classificacao,
          ds_fonte_emissora:  fonteEmissora.ds_fonte_emissora,
          ds_observacao:  fonteEmissora.ds_observacao,
        });
      });
    }

  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    this.fonteEmissoraService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Fonte salva com sucesso!', 'OK');
      this.router.navigate(['/fonteemissora']);
    });
  }

  editar(id: any) {
    this.router.navigate([`/fonteemissora/adicionar/${id}`]);
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/']);
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }


}
