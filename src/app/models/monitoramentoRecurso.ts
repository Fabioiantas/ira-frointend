export class MonitoramentoRecurso {
  id: BigInteger;
  // tslint:disable-next-line:variable-name
  entidade_id: BigInteger;
  // tslint:disable-next-line:variable-name
  propriedade_id: BigInteger;
  // tslint:disable-next-line:variable-name
  dt_analise: Date;
  // tslint:disable-next-line:variable-name
  tipo_recurso_id: BigInteger;
  // tslint:disable-next-line:variable-name
  fonte_emissora_id: BigInteger;
  monitoramento: any;
  laudos: import("c:/xampp/htdocs/ira-frointend/src/app/models/monitoramentoLaudo").MonitoramentoLaudo;
}
