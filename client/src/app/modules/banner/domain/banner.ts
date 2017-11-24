import { Botao } from './botao';
export class Banner {
  _id: number;
  titulo: string;
  texto: string;
  arquivo: string;
  botoes: Botao[] = [];
  imagem: string | any;

  constructor() {

  }
}
