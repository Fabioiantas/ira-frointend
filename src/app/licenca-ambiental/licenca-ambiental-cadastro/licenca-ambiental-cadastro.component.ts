import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LicencaAmbientalService } from 'src/app/services/licenca-ambiental.service';
import { EntidadeService } from 'src/app/services/entidade.service';
import { Entidade } from 'src/app/models/entidade';
import { LicencaAmbiental } from 'src/app/models/licencaAmbiental';
import { TipoAtividadeService } from 'src/app/services/tipo-atividade.service';
import { TipoAtividade } from 'src/app/models/tipoatividade';
import { TipoLicenca } from 'src/app/models/tipoLicenca';
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

  id: any;
  
  listEntidade: Entidade[] = [];
  listTipoAtividade: TipoAtividade[] = [];
  listTipoLicenca: TipoLicenca[] = [];
  listOrgao: Orgao[] = [];
  
  formGroup = new FormGroup({
    id: new FormControl(''),
    nr_licenca_ambiental: new FormControl(''),
    nr_protocolo: new FormControl(''),
    //nr_protocolo_novo: new FormControl('', Validators.required),
    //id_licenca_pai: new FormControl('', Validators.required),
    dt_emissao: new FormControl(''),
    dt_validade: new FormControl(''),
    dt_emissao_protocolo: new FormControl(''),
    dt_protocolacao: new FormControl(''),
    dt_validade_protocolo: new FormControl(''),
    nr_dias_limite_protocolo: new FormControl('', Validators.required),
    id_entidade: new FormControl('', Validators.required),
    nm_entidade: new FormControl('', Validators.required),
    id_orgao: new FormControl('', Validators.required),
    nm_orgao: new FormControl('', Validators.required),
    id_tipo_licenca: new FormControl('', Validators.required),
    nm_licenca: new FormControl('', Validators.required),
    nm_abreviado: new FormControl('', Validators.required),
    id_tipo_atividade: new FormControl('', Validators.required),
    nm_atividade: new FormControl('', Validators.required),
    ds_email_alerta: new FormControl('', Validators.required)
    // ds_situacao: new FormControl('', Validators.required)
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
    
    this.entidadeService.listaEntidades().subscribe(entidades => {
      this.listEntidade = entidades;
    });  
    
    this.atividadeService.listaAtividades().subscribe(tipoAtividades => {
      this.listTipoAtividade = tipoAtividades;
    });

    this.tipoLicencaService.listaTipoLicenca().subscribe(tipoLicencas => {
      this.listTipoLicenca = tipoLicencas;
    });

    
    if (this.params.id) {
      this.licencaAmbientalService.getLicencaById(this.params.id).subscribe(licencaAmbiental => {
        this.licencaAmbiental = licencaAmbiental;        
        this.formGroup.patchValue({
          id: this.licencaAmbiental[0].id, 
          nr_licenca_ambiental: this.licencaAmbiental[0].nr_licenca_ambiental,
          nr_protocolo: this.licencaAmbiental[0].nr_protocolo,
          nr_protocolo_novo: this.licencaAmbiental[0].nr_protocolo_novo,
          id_licenca_pai: this.licencaAmbiental[0].id_licenca_pai,
          dt_emissao: new Date(this.licencaAmbiental[0].dt_emissao),
          dt_validade: new Date(this.licencaAmbiental[0].dt_emissao),
          dt_emissao_protocolo: new Date(this.licencaAmbiental[0].dt_emissao_protocolo),
          // dt_protocolacao: new Date(this.licencaAmbiental[0].dt_protocolacao),
          dt_validade_protocolo: new Date(this.licencaAmbiental[0].dt_validade_protocolo),
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

  changeEntidade() {
   console.log('id: ' + this.formGroup.getRawValue());
  }

}
