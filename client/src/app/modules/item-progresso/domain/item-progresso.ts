export class ItemProgresso {

  static CORES: any = {
    red: 'Vermelho',
    pink: 'Rosa',
    blue: 'Azul',
    green: 'Verde',
    purple: 'Roxo',
    orange: 'Laranja',
    brown: 'Marrom',
    yellow: 'Amarelo'
  };
  static CORES_ARR: any = [
    { value: 'red', label: 'Vermelho' },
    { value: 'pink', label: 'Rosa' },
    { value: 'blue', label: 'Azul' },
    { value: 'green', label: 'Verde' },
    { value: 'purple', label: 'Roxo' },
    { value: 'orange', label: 'Laranja' },
    { value: 'brown', label: 'Marrom' },
    { value: 'yellow', label: 'Amarelo' }
  ];

  _id: number;
  titulo: string;
  subtitulo: string;
  cor: string;
  progresso: number;

  constructor() {

  }
}
