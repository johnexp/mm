import { MenuModule } from './../../domain/menu-module';
import { MenuModuleService } from './../../service/menu-module.service';
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

  sections: MenuModule[] = [];

  constructor(private authentication: AuthenticationService,
    private menuModuleService: MenuModuleService,
    private router: Router) {
  }

  ngOnInit() {
    // TODO: treat error
    this.menuModuleService.getModules().subscribe(
      response => {
        this.sections = response;
      },
      error => {

      }
    );
  }

  loadMenu(sectionName: string) {
    this.router.navigate([sectionName]);
  }

  logout() {
    this.authentication.logout();
  }
}
