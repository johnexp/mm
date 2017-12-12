import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private path: String = '';
  opened: Boolean = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const urls = this.activatedRoute.root.firstChild.snapshot.url[0];
    this.path = urls ? urls.path : '';
  }

  toggleMenu() {
    this.opened = !this.opened;
  }
}
