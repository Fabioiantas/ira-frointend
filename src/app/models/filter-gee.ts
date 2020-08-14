import { EscopoGee } from './escopoGee';
import { TipoCombustivel } from './tipoCombustivel';
import { FonteEmissao } from './fonteEmissao';
import { Entidade } from './entidade';

export class FilterGee {
  escopo: EscopoGee;
  entidade: Entidade;
  fonteEmissao: FonteEmissao;
  tipoCombustivel: TipoCombustivel;
}
