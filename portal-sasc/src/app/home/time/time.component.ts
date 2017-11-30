import { AppSettings } from './../../app.settings';
import { Router } from '@angular/router';
import { HomeService } from './../../service/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  membros: any[] = [];
  tituloModalMembro: String = '';
  apresentacaoMembro: String = '';

  constructor(private homeService: HomeService,
    private router: Router) { }

  ngOnInit() {
    this.obterMembrosTime();
  }

  obterMembrosTime() {
    this.homeService.getTeamMembers().subscribe(
      response => {
        response.forEach(membro => {
          if (membro.arquivo) {
            membro.arquivo = AppSettings.SERVER_URL + membro.arquivo.split('public')[1];
          }
        });
        this.membros = response;
      },
      error => {
        this.router.navigate(['500']);
      }
    );
  }

  preencherDadosModalMembros(membro) {
    this.tituloModalMembro = membro.nome;
    this.apresentacaoMembro = membro.apresentacao;
  }

}
