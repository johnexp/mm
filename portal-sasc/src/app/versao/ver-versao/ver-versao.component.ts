import { DomSanitizer } from '@angular/platform-browser';
import { VersaoService } from './../../service/versao.service';
import { AppSettings } from './../../app.settings';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-versao',
  templateUrl: './ver-versao.component.html',
  styleUrls: ['./ver-versao.component.css']
})
export class VerVersaoComponent implements OnInit {

  versao: any = {};

  constructor(private versaoService: VersaoService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      if (params.params['id'] != null) {
        this.obterVersao(params.params['id']);
      }
    });
  }

  obterVersao(id: string) {
    this.versaoService.getVersao(id).subscribe(
      response => {
        response.descricao = this.sanitizer.bypassSecurityTrustHtml(response.descricao);
        this.versao = response;
      },
      error => {
        this.router.navigate(['500']);
      }
    );
  }

}
