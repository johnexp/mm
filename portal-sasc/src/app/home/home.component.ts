import { Router } from '@angular/router';
import { HomeService } from './../service/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  apresentacaoSite: any = {};

  constructor(private homeService: HomeService,
    private router: Router) { }

  ngOnInit() {
    this.obterApresentacao();
  }

  obterApresentacao() {
    this.homeService.getPresentation().subscribe(
      response => {
        this.apresentacaoSite = response;
      },
      error => {
        this.router.navigate(['500']);
      }
    );
  }

}
