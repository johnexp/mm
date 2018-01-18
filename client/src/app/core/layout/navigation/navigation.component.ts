import { CustomSnackBarService } from './../../util/snack-bar/custom-snack-bar.service';
import { Observable } from 'rxjs/Observable';
import { MenuModule } from './../../domain/menu-module';
import { Menu } from './../../domain/menu';
import { MenuModuleService } from './../../service/menu-module.service';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private path: String = '';
  opened: Boolean = false;
  menuItems: MenuModule = new MenuModule;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private customSnackBar: CustomSnackBarService,
    private menuModuleService: MenuModuleService,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    const urls = this.activatedRoute.root.firstChild ? this.activatedRoute.root.firstChild.snapshot : null;
    let menuPath = 'cadastros';
    if (urls && urls.url.length > 0) {
      const section = urls.url[0];
      const menu = urls.children[0].url[0];
      this.path = menu ? menu.path : '';
      menuPath = section.path;
    }
    this.getMenus(menuPath);

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.setPath();
      }
    });
  }

  getMenus(name: any) {
    this.menuModuleService.getByName(name).subscribe(
      response => {
        response = response.sort((menu1, menu2) => menu1.menus.order - menu2.menus.order);
        response.forEach(menuModule => {
          this.menuItems.name = menuModule.name;
          this.menuItems.menus.push(menuModule.menus);
        });
      },
      error => {
        this.customSnackBar.open('Não foi possível carregar os menus!', 'danger');
      }
    );
  }

  setPath() {
    const urls = this.activatedRoute.root.firstChild ? this.activatedRoute.root.firstChild.snapshot : null;
    if (urls && urls.url.length > 0 && urls.children.length > 0) {
      const menu = urls.children[0].url[0];
      this.path = menu ? menu.path : '';
    }
  }

  toggleMenu() {
    this.opened = !this.opened;
  }
}
