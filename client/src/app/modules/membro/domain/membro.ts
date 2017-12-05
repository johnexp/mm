export class Membro {
  _id: number;
  nome: string;
  cargo: string;
  apresentacao: string;
  foto: string | any;
  arquivo: string;
  nomeArquivo: string;
  ativo: boolean;

  constructor() {
    this.ativo = true;
  }
}
