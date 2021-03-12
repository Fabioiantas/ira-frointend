import { Component, OnInit } from '@angular/core';
import { FonteEmissaoService } from 'src/app/services/fonte-emissao.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FonteEmissao } from 'src/app/models/fonteEmissao';

@Component({
  selector: 'app-fonte-emissao-cadastro',
  templateUrl: './fonte-emissao-cadastro.component.html',
  styleUrls: ['./fonte-emissao-cadastro.component.sass']
})
export class FonteEmissaoCadastroComponent implements OnInit {
  params: any;
  fonteEmissao: FonteEmissao = new FonteEmissao();
  listFonteEmissao: any;
  isLoading = false;

  formGroup = new FormGroup({
    id: new FormControl(''),
    nm_fonte_emissao: new FormControl('', Validators.required),
    nm_classificacao: new FormControl('', Validators.required),
    cd_unidade_consumo: new FormControl('', Validators.required),
    qt_consumo: new FormControl('', Validators.required),
    nr_fator_co2_movel: new FormControl(''),
    nr_fator_ch4_movel: new FormControl(''),
    nr_fator_n2o_movel: new FormControl(''),
    nr_fator_movel_bio: new FormControl(''),
    nr_fator_movel_fossel: new FormControl(''),
    tipo_combustivel_m_id: new FormControl('')
  });

  constructor(private fonteEmissaoService: FonteEmissaoService,
              private dialogBox: DialogBoxService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
    });

    if (this.params.id) {
      this.fonteEmissaoService.getById(this.params.id).subscribe(fonteEmissao => {
        this.fonteEmissao = fonteEmissao;

        this.formGroup.patchValue({
          id: fonteEmissao.id,
          nm_fonte_emissao:  fonteEmissao.nm_fonte_emissao,
          nm_classificacao: fonteEmissao.nm_classificacao,
          cd_unidade_consumo:  fonteEmissao.cd_unidade_consumo,
          qt_comsumo: fonteEmissao.qt_consumo,
          nr_fator_co2_movel:  fonteEmissao.nr_fator_co2_movel,
          nr_fator_n2o_movel:  fonteEmissao.nr_fator_n2o_movel,
          nr_fator_ch4_movel:  fonteEmissao.nr_fator_ch4_movel,
          nr_fator_movel_fossel:  fonteEmissao.nr_fator_movel_fossel,
          nr_fator_movel_bio:  fonteEmissao.nr_fator_movel_bio,
          tipo_combustivel_m_id:  fonteEmissao.tipo_combustivel_m_id
        });
      });
    }

    this.fonteEmissaoService.listM().subscribe(fonteEmissao => {
      this.listFonteEmissao = fonteEmissao;
    });
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    this.fonteEmissaoService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Combustivel salvo com sucesso!', 'OK');
      this.router.navigate(['/fonte-emissao']);
    });
  }

  editar(id) {
    this.router.navigate([`/fonte-emissao/adicionar/${id}`]);
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/']);
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

}
