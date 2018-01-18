export class ItemAreaCliente {

  static CORES: any = {
    blue: 'Azul',
    indigo: 'Índigo',
    purple: 'Roxo',
    pink: 'Rosa',
    red: 'Vermelho',
    orange: 'Laranja',
    yellow: 'Amarelo',
    green: 'Verde',
    teal: 'Cerceta',
    cyan: 'Ciano',
    white: 'Branco',
    gray: 'Cinza',
    'gray-dark': 'Cinza Escuro',
  };

  static CORES_ARR: any = [
    { value: 'blue', label: 'Azul' },
    { value: 'indigo', label: 'Índigo' },
    { value: 'purple', label: 'Roxo' },
    { value: 'pink', label: 'Rosa' },
    { value: 'red', label: 'Vermelho' },
    { value: 'orange', label: 'Laranja' },
    { value: 'yellow', label: 'Amarelo' },
    { value: 'green', label: 'Verde' },
    { value: 'teal', label: 'Cerceta' },
    { value: 'cyan', label: 'Ciano' },
    { value: 'white', label: 'Branco' },
    { value: 'gray', label: 'Cinza' },
    { value: 'gray-dark', label: 'Cinza Escuro' },
  ];

  _id: string;
  titulo: string;
  resumo: string;
  cor: string;
  url: string;
  icone: string;
  ordem: number;
  home: boolean;

  ativo: boolean;

  constructor() {
    this.ativo = true;
  }
}
