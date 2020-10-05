import { StaticInjector } from '@angular/core/src/di/injector';

export class MonitoramentoLaudo {
  id: BigInteger;
  // tslint:disable-next-line:variable-name
  monitoramento_id: BigInteger;
  // tslint:disable-next-line:variable-name
  tipo_monitoramento_id: BigInteger;
  // tslint:disable-next-line:variable-name
  nm_empresa_responsavel: string;
  // tslint:disable-next-line:variable-name
  nm_monitoramento: string;
  // tslint:disable-next-line:variable-name
  nr_laudo: string;
  // tslint:disable-next-line:variable-name
  dt_laudo: Date;
}
