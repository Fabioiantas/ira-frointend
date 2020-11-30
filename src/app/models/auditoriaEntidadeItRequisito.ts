import { AuditoriaItem } from './auditoriaItem';
import { AuditoriaNivel } from './auditoriaNivel';
import { AuditoriaRequisito } from './auditoriaRequisito';

export class AuditoriaEntidadeItRequisito {
  id: BigInteger;
  auditoria_entidade_item_id: BigInteger;
  auditoria_requisito_id: BigInteger;
  ds_requisito: string;
  auditoria_requisito: AuditoriaRequisito;
  auditoria_nivel: AuditoriaNivel;
  auditoria_item: AuditoriaItem;
  classificacao_requisito_id: BigInteger;
  nr_peso: number;
  nm_classificacao: string;
  ds_orientacao: string;
  ds_observacao: string;
  ie_evidencia: string;
  ie_conforme: string;
  dt_avalicacao: Date;
  dt_prazo_adequacao: Date;
}
