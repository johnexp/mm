import { Component } from '@angular/core';
declare const jquery: any;
declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor() { }

  toggleMenu() {
    $('.header-container').toggleClass('opened');
    $('#nav-icon').toggleClass('opened');
  }
}
