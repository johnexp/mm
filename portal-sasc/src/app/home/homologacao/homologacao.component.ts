import { AppSettings } from './../../app.settings';
import { Router } from '@angular/router';
import { HomeService } from './../../service/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homologacao',
  templateUrl: './homologacao.component.html',
  styleUrls: ['./homologacao.component.css']
})
export class HomologacaoComponent implements OnInit {

  homologacoes: any[] = [];

  constructor(private homeService: HomeService,
    private router: Router) { }

  ngOnInit() {
    this.obterHomologacoes();
  }

  obterHomologacoes() {
    this.homeService.getHomologations().subscribe(
      response => {
        this.homologacoes = response;
      },
      error => {
        this.router.navigate(['500']);
      }
    );
  }

}
