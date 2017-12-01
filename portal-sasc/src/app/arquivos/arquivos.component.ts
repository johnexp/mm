import { AppSettings } from './../app.settings';
import { ArquivosService } from './../service/arquivos.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.css']
})
export class ArquivosComponent implements OnInit {

  arquivos: any[] = [];

  constructor(private arquivosService: ArquivosService,
    private router: Router) { }

  ngOnInit() {
    this.obterArquivos();
  }

  obterArquivos() {
    this.arquivosService.getFiles().subscribe(
      response => {
        response.forEach(arquivo => {
          arquivo.caminhoArquivo = AppSettings.SERVER_URL + arquivo.caminhoArquivo.split('public')[1];
        });
        this.arquivos = response;
      },
      error => {
        this.router.navigate(['500']);
      }
    );
  }

}
