import { DomSanitizer } from '@angular/platform-browser';
import { VersaoService } from './../../service/versao.service';
import { AppSettings } from './../../app.settings';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-versao',
  templateUrl: './lista-versao.component.html',
  styleUrls: ['./lista-versao.component.css']
})
export class ListaVersaoComponent implements OnInit {

  versoes: any[] = [];

  constructor(private versaoService: VersaoService,
    private sanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit() {
    this.obterVersoes();
  }

  obterVersoes() {
    this.versaoService.getVersoes().subscribe(
      response => {
        this.versoes = response.docs;
        this.versoes.forEach(versao => {
          versao.descricao = this.sanitizer.bypassSecurityTrustHtml(versao.descricao);
        });
      },
      error => {
        this.router.navigate(['500']);
      }
    );
  }

}
