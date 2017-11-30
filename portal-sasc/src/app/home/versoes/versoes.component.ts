import { Router } from '@angular/router';
import { HomeService } from './../../service/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-versoes',
  templateUrl: './versoes.component.html',
  styleUrls: ['./versoes.component.css']
})
export class VersoesComponent implements OnInit {

  versoes: any[] = [];

  constructor(private homeService: HomeService,
    private router: Router) { }

  ngOnInit() {
    this.obterVersoes();
  }

  obterVersoes() {
    this.homeService.getVersions().subscribe(
      response => {
        this.versoes = response.docs;
      },
      error => {
        this.router.navigate(['500']);
      }
    );
  }

}
