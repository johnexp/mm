import { Membro } from './../../membro/domain/membro';

export class Teste {
  _id: number;
  nome: String;
  descricao: String;
  definitivo: Boolean;
  dataInicio: Date;
  quantidade: Number;
  cor: String;
  cores: string[] = [];
  selectCores: string[] = [];
  provisorio: Boolean;
  membro: Membro = new Membro;
  membros: Membro[] = [];

  ativo: boolean;

  constructor() {
    this.ativo = true;
  }
}
