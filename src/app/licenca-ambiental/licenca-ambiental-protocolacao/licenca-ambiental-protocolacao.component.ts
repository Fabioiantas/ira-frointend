import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { LicencaAmbiental } from 'src/app/models/licencaAmbiental';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LicencaAmbientalService } from 'src/app/services/licenca-ambiental.service';

@Component({
  selector: 'app-licenca-ambiental-protocolacao',
  templateUrl: './licenca-ambiental-protocolacao.component.html',
  styleUrls: ['./licenca-ambiental-protocolacao.component.sass']
})
export class LicencaAmbientalProtocolacaoComponent implements OnInit {
  
  licencaAmbiental: LicencaAmbiental = new LicencaAmbiental();
  params: any;
  isLoading: any = false;
  showProtocoloNovo: boolean = false;
  
  //
  nrLicencaAmbiental: string;
  nmEntidade: string;
  nmReduzido: string;
  nrCnpj: string;
  nmTipoLicenca: string;
  nmTipoAtividade: string;
  nmOrgao: string;
  sgOrgao: string;
  nrProtocolo: string;
  dtEmissaoProtocolo: string;
  dtValidade: string;
  nrDiasLimite: number;
  dsSituacaoLicenca: string;


  id: any;
  
  formGroup = new FormGroup({
    id: new FormControl(''),
    nr_licenca_ambiental: new FormControl(''),
    dt_emissao: new FormControl(''),
    dt_validade: new FormControl(''),
    nr_dias_limite_protocolo: new FormControl('', Validators.required),
    nr_protocolo: new FormControl(''),
    nr_protocolo_novo: new FormControl('', Validators.required),
    dt_emissao_protocolo: new FormControl('',Validators.required),
    dt_protocolacao: new FormControl(),
    dt_validade_protocolo: new FormControl(),
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
        if (this.licencaAmbiental[0].nr_protocolo_novo !== null) {
          this.dialogBox.show('Protocolo já informado.', 'WARNING');
          this.router.navigate(['/licenca']);
        }
        this.nrLicencaAmbiental = licencaAmbiental[0].nr_licenca_ambiental;
        this.nmReduzido = licencaAmbiental[0].nm_reduzido;    
        this.nrCnpj = licencaAmbiental[0].nr_cnpj;       
        this.nmTipoLicenca   = licencaAmbiental[0].nm_licenca;       
        this.nmTipoAtividade = licencaAmbiental[0].nm_atividade;       
        this.nmOrgao         = licencaAmbiental[0].nm_orgao;       
        this.sgOrgao         = licencaAmbiental[0].sg_orgao;       
        this.nrProtocolo     = licencaAmbiental[0].nr_protocolo;       
        // this.dtEmissaoProtocolo = licencaAmbiental[0].dt_emissao_protocolo;  
        this.dtEmissaoProtocolo = moment(licencaAmbiental[0].dt_emissao_protocolo).format("DD/MM/YYYY");   
        this.dtValidade = moment(licencaAmbiental[0].dt_validade).format("DD/MM/YYYY");   
        this.nrDiasLimite = licencaAmbiental[0].nr_dias_limite_protocolo;  
        this.dsSituacaoLicenca = licencaAmbiental[0].ds_situacao;
        
        this.formGroup.patchValue({
          id: this.licencaAmbiental[0].id, 
          nr_licenca_ambiental: this.licencaAmbiental[0].nr_licenca_ambiental,
          nr_protocolo: this.licencaAmbiental[0].nr_protocolo,
          nr_protocolo_novo: this.licencaAmbiental[0].nr_protocolo_novo,
          id_licenca_pai: this.licencaAmbiental[0].id_licenca_pai,
          dt_emissao: new Date(this.licencaAmbiental[0].dt_emissao),
          dt_validade: new Date(this.licencaAmbiental[0].dt_validade),
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
      this.licencaAmbientalService.protocolar(this.formGroup.value).subscribe(() => {
        this.dialogBox.show('Licença Protocolada com sucesso!', 'OK');
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

}
