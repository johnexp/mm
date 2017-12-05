export class Botao {

  static CORES: any = {
    primary: 'Primária',
    secondary: 'Secundária',
    accent: 'Acentuada'
  };
  static CORES_ARR: any = [
    { value: 'primary', label: 'Primária' },
    { value: 'secondary', label: 'Secundária' },
    { value: 'accent', label: 'Acentuada' }
  ];

  _id: string;
  texto: string;
  url: string;
  cor: string;
}
