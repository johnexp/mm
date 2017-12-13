import { MenuService } from './../../service/menu.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private path: String = '';
  opened: Boolean = false;
  menuItems: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private menuSerice: MenuService) {
  }

  ngOnInit() {
    const urls = this.activatedRoute.root.firstChild.snapshot;
    let menuPath = 'cadastros';
    if (urls.url.length > 0) {
      const section = urls.url[0];
      const menu = urls.children[0].url[0];
      this.path = urls ? menu.path : '';
      menuPath = section.path;
    }
    this.menuItems = this.menuSerice.getMenu(menuPath);
  }

  toggleMenu() {
    this.opened = !this.opened;
  }
}
