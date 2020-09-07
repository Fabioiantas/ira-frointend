import { EscopoGee } from './escopoGee';
import { TipoCombustivel } from './tipoCombustivel';
import { FonteEmissao } from './fonteEmissao';
import { Entidade } from './entidade';
import { Propriedade } from './propriedade';
import { ProcessoAnalise } from './processoAnalise';
import { Recurso } from './recurso';
import { FonteEmissora } from './fonte-emissora';

export class FilterMonitoramentoRecurso {
  entidade: Entidade;
  propriedade: Propriedade;
  processo: ProcessoAnalise;
  recurso: Recurso;
  fonteEmissora: FonteEmissora;
}
