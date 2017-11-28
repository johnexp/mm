import { AppSettings } from './../app.settings';
import { HomeService } from './../service/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  banners: any[] = [];

  constructor(private homeService: HomeService) { }

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
        console.log(response);
      },
      error => {
        alert('Erro');
      }
    );
  }
}
