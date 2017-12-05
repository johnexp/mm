import { AppSettings } from './../../app.settings';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-server-error',
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.css']
})
export class InternalServerErrorComponent implements OnInit {

  portalUrl: String = AppSettings.PORTAL_URL;

  constructor() { }

  ngOnInit() {
  }

}

