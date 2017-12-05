import { Ticket } from './ticket';

export class Versao {
  _id: string;
  numeroVersao: string;
  descricao: string;
  dataPublicacao: Date;
  dataRelease: Date;
  tickets: Ticket[] = [];

  constructor() {
  }
}
