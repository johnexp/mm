import { File } from './../../../core/domain/file';

export class Parceiro {
  _id: number;
  nome: String;
  tipo: String;
  imagem: File;
  url: String;
  ordem: Number;

  ativo: boolean;

  constructor() {
    this.ativo = true;
  }
}
