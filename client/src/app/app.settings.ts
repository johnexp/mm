import { environment } from './../environments/environment';

export class AppSettings {
  public static API_ENDPOINT = environment.production ? 'http://novosite.valem.com.br/api' : 'http://localhost:3002/api';
  public static SERVER_URL = environment.production ? 'http://novosite.valem.com.br/public' : 'http://localhost:3002';
}
