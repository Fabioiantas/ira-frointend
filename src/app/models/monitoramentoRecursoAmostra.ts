import { ResultadoAmostra } from './resultadoAmostra';

export class MonitoramentoRecursoAmostra {
  id: BigInteger;
  // tslint:disable-next-line:variable-name
  monitoramento_laudo_id: BigInteger;
  // tslint:disable-next-line:variable-name
  nr_sequencia_amostra: BigInteger;
  // tslint:disable-next-line:variable-name
  nr_amostra: BigInteger;
  // tslint:disable-next-line:variable-name
  ds_amostra: Date;
  // tslint:disable-next-line:variable-name
  dt_amostra: Date;
  resultados: ResultadoAmostra;
}
