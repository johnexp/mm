import { User } from './../../domain/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

  currentUser: User;

  constructor() {
  }

  ngOnInit() {
    try {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    } catch (e) {
      this.currentUser = new User;
    }
  }

}
