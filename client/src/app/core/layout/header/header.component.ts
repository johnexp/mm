import { CustomSnackBarService } from './../../util/snack-bar/custom-snack-bar.service';
import { MenuModule } from './../../domain/menu-module';
import { MenuModuleService } from './../../service/menu-module.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sections: MenuModule[] = [];
  activeSection: String = 'cadastros';

  constructor(private authentication: AuthenticationService,
    private menuModuleService: MenuModuleService,
    private activatedRoute: ActivatedRoute,
    private customSnackBar: CustomSnackBarService,
    private router: Router) {
  }

  ngOnInit() {
    this.menuModuleService.getModules().subscribe(
      response => {
        this.sections = response;
      },
      error => {
        this.customSnackBar.open('Não foi possível carregar os módulos!', 'danger');
      }
    );

    const urls = this.activatedRoute.root.firstChild ? this.activatedRoute.root.firstChild.snapshot : null;
    if (urls && urls.url.length > 0) {
      this.activeSection = urls.url[0].path;
    }
  }

  loadMenu(sectionName: string) {
    this.router.navigate([sectionName]);
  }

  logout() {
    this.authentication.logout();
  }
}
