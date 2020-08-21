import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CombustivelService } from 'src/app/services/combustivel.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { Router,  ActivatedRoute } from '@angular/router';
import { TipoCombustivel } from 'src/app/models/tipoCombustivel';

@Component({
  selector: 'app-combustivel-cadastro',
  templateUrl: './combustivel-cadastro.component.html',
  styleUrls: ['./combustivel-cadastro.component.sass']
})
export class CombustivelCadastroComponent implements OnInit {

  params: any;
  combustivel: TipoCombustivel = new TipoCombustivel();
  listCombustivel: TipoCombustivel = new TipoCombustivel();

  formGroup = new FormGroup({
    id: new FormControl(''),
    nm_combustivel: new FormControl('', Validators.required),
    cd_unidade_padrao: new FormControl('', Validators.required),
    nr_fator_co2_bio: new FormControl('', Validators.required),
    nr_fator_ch4_bio: new FormControl('', Validators.required),
    nr_fator_n2o_bio: new FormControl('', Validators.required),
    nr_fator_co2_fossel: new FormControl('', Validators.required),
    nr_fator_ch4_fossel: new FormControl('', Validators.required),
    nr_fator_n2o_fossel: new FormControl('', Validators.required),
    nr_fator_co2_movel: new FormControl('', Validators.required),
    nr_fator_ch4_movel: new FormControl('', Validators.required),
    nr_fator_n2o_movel: new FormControl('', Validators.required),
    nr_fator_movel_bio: new FormControl('', Validators.required),
    nr_fator_movel_fossel: new FormControl('', Validators.required),
    tipo_combustivel_m_id: new FormControl('', Validators.required)
  });

  constructor(private combustivelService: CombustivelService,
              private dialogBox: DialogBoxService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
    });

    if (this.params.id) {
      this.combustivelService.getById(this.params.id).subscribe(combustivel => {
        this.combustivel = combustivel;
        this.formGroup.patchValue({
          nm_combustivel:  combustivel.nm_combustivel,
          cd_unidade_padrao:  combustivel.cd_unidade_padrao,
          nr_fator_co2_bio:  combustivel.nr_fator_co2_bio,
          nr_fator_n2o_bio:  combustivel.nr_fator_n2o_bio,
          nr_fator_ch4_bio:  combustivel.nr_fator_ch4_bio,
          nr_fator_co2_fossel:  combustivel.nr_fator_co2_fossel,
          nr_fator_n2o_fossel:  combustivel.nr_fator_n2o_fossel,
          nr_fator_ch4_fossel:  combustivel.nr_fator_ch4_fossel,
          nr_fator_co2_movel:  combustivel.nr_fator_co2_movel,
          nr_fator_n2o_movel:  combustivel.nr_fator_n2o_movel,
          nr_fator_ch4_movel:  combustivel.nr_fator_ch4_movel,
          nr_fator_movel_fossel:  combustivel.nr_fator_movel_fossel,
          nr_fator_movel_bio:  combustivel.nr_fator_movel_bio,
          tipo_combustivel_m_id:  combustivel.tipo_combustivel_m_id
        });
      });
    }

    this.combustivelService.getList().subscribe(combustiveis => {
      this.listCombustivel = combustiveis;
    });
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    console.log(this.formGroup.value.id);

    this.combustivelService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Combustivel salvo com sucesso!', 'OK');
      this.router.navigate(['/combustivel']);
    });
  }

  editar(id) {
    this.router.navigate([`/combustivel/adicionar/${id}`]);
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/combustivel']);
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

}
