import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { LicencaAmbientalService } from 'src/app/services/licenca-ambiental.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { LicencaAmbiental } from 'src/app/models/licencaAmbiental';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewFlags } from '@angular/core/src/view';

@Component({
  selector: 'app-licenca-ambiental-renova',
  templateUrl: './licenca-ambiental-renova.component.html',
  styleUrls: ['./licenca-ambiental-renova.component.sass']
})
export class LicencaAmbientalRenovaComponent implements OnInit {
  licencaAmbiental: LicencaAmbiental = new LicencaAmbiental();
  params: any;
  isLoading: any = false;
  
  nmEntidade: string;
  nmReduzido: string;
  nrCnpj: string;
  nmTipoLicenca: string;
  nmTipoAtividade: string;
  nmOrgao: string;
  sgOrgao: string;
  nrProtocolo: string;
  nrProtocoloNovo: string;
  dtEmissaoProtocolo: string;
  dtValidade: string;
  nrDiasLimite: number;


  id: any;
  
  formGroup = new FormGroup({
    id: new FormControl(''),
    // id_licenca_pai: new FormControl('',Validators.required),
    nr_licenca_ambiental: new FormControl('',Validators.required),
    dt_emissao: new FormControl('',Validators.required),
    dt_validade: new FormControl('',Validators.required),
    nr_dias_limite_protocolo: new FormControl('', Validators.required),
    // nr_protocolo: new FormControl(''),
    nr_protocolo_novo: new FormControl(''),
    // dt_emissao_protocolo: new FormControl(),
    //dt_protocolacao: new FormControl(),
    //dt_validade_protocolo: new FormControl(),
    id_entidade: new FormControl(''),
    id_orgao: new FormControl(''),
    id_tipo_licenca: new FormControl(''),
    id_tipo_atividade: new FormControl(''),
    ds_email_alerta: new FormControl(''),
    dt_protocolar_em: new FormControl('')
  });

  constructor(private licencaAmbientalService: LicencaAmbientalService, 
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
    });
    
    if (this.params.id) {
      this.licencaAmbientalService.getLicencaById(this.params.id).subscribe(licencaAmbiental => {
        this.licencaAmbiental = licencaAmbiental; 
        if (this.licencaAmbiental[0].nr_licenca_ambiental === null) {
          this.dialogBox.show('Antes de Renovar efetue o Licenciamento.', 'WARNING');
          this.router.navigate(['/licenca']);
        } 
        if (this.licencaAmbiental[0].nr_protocolo_novo === null) {
          this.dialogBox.show('Antes de Renovar efetue a Protolação da Licença', 'WARNING');
          this.router.navigate(['/licenca']);
        }
        this.nmReduzido = licencaAmbiental[0].nm_reduzido;    
        this.nrCnpj = licencaAmbiental[0].nr_cnpj;       
        this.nmTipoLicenca   = licencaAmbiental[0].nm_licenca;       
        this.nmTipoAtividade = licencaAmbiental[0].nm_atividade;       
        this.nmOrgao         = licencaAmbiental[0].nm_orgao;       
        this.sgOrgao         = licencaAmbiental[0].sg_orgao;       
        this.nrProtocolo     = licencaAmbiental[0].nr_protocolo;       
        this.nrProtocoloNovo     = licencaAmbiental[0].nr_protocolo_novo;       
        // this.dtEmissaoProtocolo = licencaAmbiental[0].dt_emissao_protocolo;  
        this.dtEmissaoProtocolo = moment(licencaAmbiental[0].dt_emissao_protocolo).format("DD/MM/YYYY");   
        this.dtValidade = moment(licencaAmbiental[0].dt_validade).format("DD/MM/YYYY");   
        this.nrDiasLimite = licencaAmbiental[0].nr_dias_limite_protocolo;  
        
        this.formGroup.patchValue({
          id: this.licencaAmbiental[0].id,
          //id_licenca_pai: this.licencaAmbiental[0].id,
          // dt_emissao: new Date(this.licencaAmbiental[0].dt_emissao),
          // dt_validade: new Date(this.licencaAmbiental[0].dt_validade),
          nr_dias_limite_protocolo: this.licencaAmbiental[0].nr_dias_limite_protocolo,
          // nr_licenca_ambiental: this.licencaAmbiental[0].nr_licenca_ambiental,
          // nr_protocolo: this.licencaAmbiental[0].nr_protocolo,
          nr_protocolo_novo: this.licencaAmbiental[0].nr_protocolo_novo,
          dt_emissao_protocolo: this.licencaAmbiental[0].dt_emissao_protocolo,
          // dt_protocolacao: new Date(this.licencaAmbiental[0].dt_protocolacao),
          //dt_validade_protocolo: new Date(this.licencaAmbiental[0].dt_validade_protocolo),
          id_entidade: this.licencaAmbiental[0].id_entidade,
          //nm_entidade: this.licencaAmbiental[0].nm_entidade,
          id_orgao: this.licencaAmbiental[0].id_orgao,
          //nm_orgao: this.licencaAmbiental[0].nm_orgao,
          id_tipo_licenca: this.licencaAmbiental[0].id_tipo_licenca,
          //nm_licenca:  this.licencaAmbiental[0].nm_licenca,
          //nm_abreviado: this.licencaAmbiental[0].nm_abreviado,
          id_tipo_atividade: this.licencaAmbiental[0].id_tipo_atividade,
          //nm_atividade: this.licencaAmbiental[0].nm_atividade,
          ds_email_alerta: this.licencaAmbiental[0].ds_email_alerta
          //ds_situacao: this.licencaAmbiental[0].ds_situacao
        });
      });
      this.changeDias();
    }
  }
  
  salvar() {
    if (!this.formGroup.valid) { return; }  
      console.log(this.formGroup.value);
      this.licencaAmbientalService.renovar(this.formGroup.value).subscribe(() => {
        this.dialogBox.show('Licenca Ambiental Renovada com sucesso!', 'OK');
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

  changeDias() {
    this.nrDiasLimite = this.formGroup.get('nr_dias_limite_protocolo').value;

    let dtProt = moment(this.dtValidade, "DD/MM/YYYY").add(-this.nrDiasLimite, 'days').format("DD/MM/YYYY");
    this.formGroup.get('dt_protocolar_em').setValue(dtProt);
  }

  onBlurMethod() {
    this.nrDiasLimite = this.formGroup.get('nr_dias_limite_protocolo').value;
    let dtProt = moment(this.dtValidade, "DD/MM/YYYY").add(-this.nrDiasLimite, 'days').format("DD/MM/YYYY");
    this.formGroup.get('dt_protocolar_em').setValue(dtProt);
  }

}
