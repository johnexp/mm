import { WikiService } from './../../service/wiki.service';
import { AppSettings } from './../../app.settings';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-wiki',
  templateUrl: './lista-wiki.component.html',
  styleUrls: ['./lista-wiki.component.css']
})
export class ListaWikiComponent implements OnInit {

  wikis: any[] = [];

  constructor(private wikiService: WikiService,
    private router: Router) { }

  ngOnInit() {
    this.obterWikis();
  }

  obterWikis() {
    this.wikiService.getWikis().subscribe(
      response => {
        this.wikis = response;
      },
      error => {
        this.router.navigate(['500']);
      }
    );
  }

}
