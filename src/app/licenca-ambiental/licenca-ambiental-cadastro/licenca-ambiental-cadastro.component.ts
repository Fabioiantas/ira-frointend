import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ActivatedRoute, Router, Data } from '@angular/router';
import * as moment from 'moment';
import { LicencaAmbientalService } from 'src/app/services/licenca-ambiental.service';
import { EntidadeService } from 'src/app/services/entidade.service';
import { Entidade } from 'src/app/models/entidade';
import { LicencaAmbiental } from 'src/app/models/licencaAmbiental';
import { TipoAtividadeService } from 'src/app/services/tipo-atividade.service';
import { TipoAtividade } from 'src/app/models/tipoatividade';
import { TipoLicenca } from 'src/app/models/TipoLicenca';
import { TipoLicencaService } from 'src/app/services/tipo-licenca.service';
import { Orgao } from 'src/app/models/orgao';
import { OrgaoService } from 'src/app/services/orgao.service';

@Component({
  selector: 'app-licenca-ambiental-cadastro',
  templateUrl: './licenca-ambiental-cadastro.component.html',
  styleUrls: ['./licenca-ambiental-cadastro.component.sass']
})
export class LicencaAmbientalCadastroComponent implements OnInit {
  licencaAmbiental: LicencaAmbiental = new LicencaAmbiental();
  params: any;
  isLoading: any = false;
  showNovoP = false;
  id: any;

  listEntidade: Entidade[] = [];
  listTipoAtividade: TipoAtividade[] = [];
  listTipoLicenca: TipoLicenca[] = [];
  listOrgao: Orgao[] = [];

  dtValidade: string;
  nrDiasLimite: number;

  formGroup = new FormGroup({
    id: new FormControl(''),
    nr_licenca_ambiental: new FormControl(''),
    nr_protocolo: new FormControl(''),
    nr_protocolo_novo: new FormControl(''),
    dt_emissao: new FormControl(),
    dt_validade: new FormControl(),
    dt_emissao_protocolo: new FormControl(),
    dt_protocolacao: new FormControl(),
    dt_validade_protocolo: new FormControl(),
    nr_dias_limite_protocolo: new FormControl('', Validators.required),
    dt_protocolar_em: new FormControl(''),
    id_entidade: new FormControl('', Validators.required),
    id_orgao: new FormControl('', Validators.required),
    id_tipo_licenca: new FormControl('', Validators.required),
    id_tipo_atividade: new FormControl('', Validators.required),
    ds_email_alerta: new FormControl('', Validators.required)
  });

  constructor(private licencaAmbientalService: LicencaAmbientalService,
              private entidadeService: EntidadeService,
              private atividadeService: TipoAtividadeService,
              private tipoLicencaService: TipoLicencaService,
              private orgaoService: OrgaoService,
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(data => {
      this.params = data;
    });

    this.entidadeService.listaEntidades().subscribe((entidades: Entidade[]) => {
      this.listEntidade = entidades;
    });

    this.atividadeService.listaAtividades().subscribe((tipoAtividades: TipoAtividade[]) => {
      this.listTipoAtividade = tipoAtividades;
    });

    this.tipoLicencaService.listaTipoLicenca().subscribe((tipoLicencas: TipoLicenca[]) => {
      this.listTipoLicenca = tipoLicencas;
    });

    this.orgaoService.Orgaolista().subscribe((orgao: Orgao[]) => {
      this.listOrgao = orgao;
    });


    if (this.params.id) {
      this.licencaAmbientalService.getLicencaById(this.params.id).subscribe(licencaAmbiental => {
          this.licencaAmbiental = licencaAmbiental;

          this.dtValidade = moment(licencaAmbiental[0].dt_validade).format('DD/MM/YYYY');
          this.nrDiasLimite = licencaAmbiental[0].nr_dias_limite_protocolo;

          this.formGroup.patchValue({
          id: this.licencaAmbiental[0].id,
          nr_licenca_ambiental: this.licencaAmbiental[0].nr_licenca_ambiental,
          nr_protocolo: this.licencaAmbiental[0].nr_protocolo,
          nr_protocolo_novo: this.licencaAmbiental[0].nr_protocolo_novo,
          id_licenca_pai: this.licencaAmbiental[0].id_licenca_pai,
          dt_emissao: this.licencaAmbiental[0].dt_emissao ? new Date(this.licencaAmbiental[0].dt_emissao) : null,
          dt_validade: this.licencaAmbiental[0].dt_validade ? new Date(this.licencaAmbiental[0].dt_validade) : null,
          dt_emissao_protocolo: this.licencaAmbiental[0].dt_emissao_protocolo ?
            new Date(this.licencaAmbiental[0].dt_emissao_protocolo) : null,
          dt_validade_protocolo: this.licencaAmbiental[0].dt_validade_protocolo ?
            new Date(this.licencaAmbiental[0].dt_validade_protocolo) : null,
          // dt_protocolacao: new Date(this.licencaAmbiental[0].dt_protocolacao),
          nr_dias_limite_protocolo: this.licencaAmbiental[0].nr_dias_limite_protocolo,
          id_entidade: this.licencaAmbiental[0].id_entidade,
          nm_entidade: this.licencaAmbiental[0].nm_entidade,
          id_orgao: this.licencaAmbiental[0].id_orgao,
          nm_orgao: this.licencaAmbiental[0].nm_orgao,
          id_tipo_licenca: this.licencaAmbiental[0].id_tipo_licenca,
          nm_licenca:  this.licencaAmbiental[0].nm_licenca,
          nm_abreviado: this.licencaAmbiental[0].nm_abreviado,
          id_tipo_atividade: this.licencaAmbiental[0].id_tipo_atividade,
          nm_atividade: this.licencaAmbiental[0].nm_atividade,
          ds_email_alerta: this.licencaAmbiental[0].ds_email_alerta,
          ds_situacao: this.licencaAmbiental[0].ds_situacao
        });

          this.changeDias();
          this.showNovoP = this.licencaAmbiental[0].nr_protocolo_novo !== null ? true : false;
      });
    }
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    this.licencaAmbientalService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
        this.dialogBox.show('Licenca Ambiental salva com sucesso!', 'OK');
        this.router.navigate(['/licenca']);
      });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/licenca']);
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

  changeValidade() {
    console.log('data:' + this.dtValidade);
    this.dtValidade = this.formGroup.get('dt_validade').value;

  }

  changeDias() {
    if (this.formGroup.get('dt_validade').value !== null) {
      this.formGroup.get('dt_protocolar_em').setValue(
        moment(this.formGroup.get('dt_validade').value)
        .add(- this.formGroup.get('nr_dias_limite_protocolo').value, 'days')
        .format('DD/MM/YYYY')
      );
    }
  }

}
