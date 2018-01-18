import { File } from './../../../core/domain/file';

export class ProdutoServico {
  _id: number;
  titulo: String;
  data: Date;
  descricao: String;
  imagem: File;

  ativo: boolean;

  constructor() {
    this.ativo = true;
  }
}
