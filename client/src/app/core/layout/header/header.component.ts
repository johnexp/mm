import { Router } from '@angular/router';
import { MenuService } from './../../service/menu.service';
import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sections: string[] = [];

  constructor(private authentication: AuthenticationService,
    private menuService: MenuService,
    private router: Router) {
  }

  ngOnInit() {
    const menus = this.menuService.getMenu();
    this.sections = Object.keys(menus).map(function (menu) {
      return menus[menu];
    });
  }

  loadMenu(sectionName: string) {
    this.router.navigate([sectionName]);
  }

  logout() {
    this.authentication.logout();
  }
}
