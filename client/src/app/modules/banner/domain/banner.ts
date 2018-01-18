import { Botao } from './botao';
import { File } from './../../../core/domain/file';

export class Banner {
  _id: number;
  tituloL1: String;
  tituloL2: String;
  texto: String;
  imagem: File;
  botoes: Botao[] = [];
  ativo: Boolean = true;

  constructor() {
  }
}
