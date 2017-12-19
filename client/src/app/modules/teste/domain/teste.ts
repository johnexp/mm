import { File } from './../../../core/domain/file';
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
  membro: Membro;
  membros: Membro[] = [];
  documento: File;
  imagem: File;

  ativo: boolean;

  constructor() {
    this.ativo = true;
  }
}
