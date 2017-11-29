import { Router } from '@angular/router';
import { HomeService } from './../../service/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progresso',
  templateUrl: './progresso.component.html',
  styleUrls: ['./progresso.component.scss']
})
export class ProgressoComponent implements OnInit {

  progressos: any[] = [];

  constructor(private homeService: HomeService,
    private router: Router) { }

  ngOnInit() {
    this.obterProgressos();
  }

  obterProgressos() {
    this.homeService.getProgress().subscribe(
      response => {
        this.progressos = response;
      },
      error => {
        this.router.navigate(['500']);
      }
    );
  }

}
