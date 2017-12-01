import { SobreService } from './../service/sobre.service';
import { AppSettings } from './../app.settings';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {

  sobreInfo: any = {};

  constructor(private sobreService: SobreService,
    private sanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit() {
    this.obterSobreInfo();
  }

  obterSobreInfo() {
    this.sobreService.getAboutInfo().subscribe(
      response => {
        response.texto = this.sanitizer.bypassSecurityTrustHtml(response.texto);
        this.sobreInfo = response;
      },
      error => {
        this.router.navigate(['500']);
      }
    );
  }

}

