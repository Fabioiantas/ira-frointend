export class LicencaAmbiental {
  id: BigInteger;
  nr_licenca_ambiental: string;
  nr_protocolo: string;
  nr_protocolo_novo: string;
  id_licenca_pai: BigInteger;
  dt_emissao: Date;
  dt_validade: Date;
  dt_emissao_protocolo: Date;
  dt_protocolacao: Date;
  dt_validade_protocolo: Date;
  nr_dias_limite_protocolo: BigInteger;
  id_entidade: BigInteger;
  nm_entidade: string;
  id_orgao: BigInteger;
  nm_orgao: string;
  id_tipo_licenca: BigInteger;
  nm_abreviado: string;
  nm_licenca: string;
  id_tipo_atividade: BigInteger;
  nm_atividade: string;
  ds_email_alerta: string;
  ds_situacao: string;
}
