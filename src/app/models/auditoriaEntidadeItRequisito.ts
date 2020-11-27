import { AuditoriaRequisito } from './auditoriaRequisito';

export class AuditoriaEntidadeItRequisito {
  id: BigInteger;
  auditoria_entidade_item_id: BigInteger;
  auditoria_requisito_id: BigInteger;
  ds_requisito: string;
  auditoria_requisito: AuditoriaRequisito;
  classificacao_requisito_id: BigInteger;
  nr_peso: number;
  nm_classificacao: string;
  ds_orientacao: string;
  ie_evidencia: string;
  ie_conforme: string;
}
