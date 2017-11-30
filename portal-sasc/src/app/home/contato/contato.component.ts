import { Router } from '@angular/router';
import { HomeService } from './../../service/home.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  contato: any = {};
  @ViewChild('form') form;

  constructor(private homeService: HomeService,
    private router: Router) { }

  ngOnInit() {
  }

  enviarContato() {
    if (!this.form.valid) {
      alert('Erro!');
      return;
    }
  }

}
