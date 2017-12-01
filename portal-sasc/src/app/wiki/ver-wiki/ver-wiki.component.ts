import { DomSanitizer } from '@angular/platform-browser';
import { WikiService } from './../../service/wiki.service';
import { AppSettings } from './../../app.settings';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-wiki',
  templateUrl: './ver-wiki.component.html',
  styleUrls: ['./ver-wiki.component.css']
})
export class VerWikiComponent implements OnInit {

  wiki: any = {};

  constructor(private wikiService: WikiService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterWiki(params.params['id']);
      }
    });
  }

  obterWiki(id: string) {
    this.wikiService.getWiki(id).subscribe(
      response => {
        response.conteudo = this.sanitizer.bypassSecurityTrustHtml(response.conteudo);
        this.wiki = response;
      },
      error => {
        this.router.navigate(['500']);
      }
    );
  }

}
