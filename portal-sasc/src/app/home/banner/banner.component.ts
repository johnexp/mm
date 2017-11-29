import { Router } from '@angular/router';
import { AppSettings } from './../../app.settings';
import { HomeService } from './../../service/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  banners: any[] = [];

  constructor(private homeService: HomeService,
    private router: Router) { }

  ngOnInit() {
    this.obterBanners();
  }

  obterBanners() {
    this.homeService.getBanners().subscribe(
      response => {
        response.forEach(banner => {
          banner.arquivo = AppSettings.SERVER_URL + banner.arquivo.split('public')[1];
        });
        this.banners = response;
      },
      error => {
        this.router.navigate(['500']);
      }
    );
  }
}
